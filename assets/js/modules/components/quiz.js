/**
 * Single-choice quiz for the `{{< quiz >}}` shortcode.
 *
 * The shortcode renders the authored markdown into `.quiz-source`, hidden by
 * CSS, in a deliberately flat shape: a paragraph starts a question, the task
 * list under it holds the options with `- [x]` on the correct one, and an
 * optional blockquote is the explanation. This reads that, then replaces it
 * with the interactive version.
 *
 * `- [x]` survives as `<i class="... checked">` because the theme's
 * refactor-content rewrites task-list checkboxes into icons, which is how the
 * answer key crosses from markdown into the DOM.
 *
 * Answering locks the question, colours the pick, points out the right answer
 * when the pick was wrong, and reveals the explanation. Answers are kept per
 * page in localStorage so a reader can come back to a half-finished quiz.
 */

const ICON_BLANK = 'far fa-circle fa-fw';
const ICON_RIGHT = 'fas fa-circle-check fa-fw';
const ICON_WRONG = 'fas fa-circle-xmark fa-fw';
const STORE_PREFIX = 'quiz:';

function storageKey(index) {
  return `${STORE_PREFIX}${window.location.pathname}:${index}`;
}

/** One character per question: the picked index, or `-` for unanswered. */
function loadState(index, count) {
  try {
    const raw = window.localStorage.getItem(storageKey(index));
    if (raw && raw.length === count) {
      return raw.split('').map((char) => (char === '-' ? null : Number(char)));
    }
  } catch (e) {
    /* private mode, blocked storage: fall through to a blank quiz */
  }
  return new Array(count).fill(null);
}

function saveState(index, picks) {
  try {
    const raw = picks.map((pick) => (pick === null || pick > 9 ? '-' : String(pick))).join('');
    window.localStorage.setItem(storageKey(index), raw);
  } catch (e) {
    /* not being able to remember is not worth breaking the page over */
  }
}

/**
 * Group the rendered markdown into questions. Anything that is not a task
 * list or a blockquote starts a new question, which keeps the authored format
 * free of indentation rules.
 */
function parseSource(source) {
  const questions = [];
  let current = null;

  Array.from(source.children).forEach((node) => {
    const isOptions = node.tagName === 'UL' && node.classList.contains('task-list');

    if (isOptions) {
      if (current && !current.options) {
        current.options = node;
      }
    } else if (node.tagName === 'BLOCKQUOTE') {
      if (current && !current.explain) {
        current.explain = node;
      }
    } else {
      current = { prompt: node, options: null, explain: null };
      questions.push(current);
    }
  });

  // a question with no options is prose the author left in the block
  return questions.filter((q) => q.options);
}

/** The option label is everything after the icon the theme injected. */
function labelNodes(li) {
  return Array.from(li.childNodes).filter(
    (node) => !(node.nodeType === Node.ELEMENT_NODE && node.tagName === 'I')
  );
}

function buildQuestion(parsed) {
  const item = document.createElement('li');
  item.className = 'quiz-q';

  const prompt = document.createElement('div');
  prompt.className = 'quiz-prompt';
  prompt.appendChild(parsed.prompt);
  item.appendChild(prompt);

  const options = document.createElement('ul');
  options.className = 'quiz-options';
  options.setAttribute('role', 'radiogroup');

  const rows = Array.from(parsed.options.querySelectorAll(':scope > li')).map((li) => {
    const row = document.createElement('li');
    row.className = 'quiz-option';
    row.setAttribute('role', 'radio');
    row.setAttribute('aria-checked', 'false');
    row.setAttribute('tabindex', '0');
    // the theme marks `- [x]` with `.checked`; that is the answer key
    row.dataset.answer = li.querySelector('i.checked') ? 'true' : 'false';

    const icon = document.createElement('i');
    icon.className = ICON_BLANK;
    icon.setAttribute('aria-hidden', 'true');
    row.appendChild(icon);

    const label = document.createElement('span');
    labelNodes(li).forEach((node) => label.appendChild(node));
    row.appendChild(label);

    options.appendChild(row);
    return row;
  });

  item.appendChild(options);

  let explain = null;
  if (parsed.explain) {
    explain = document.createElement('div');
    explain.className = 'quiz-explain';
    explain.hidden = true;
    Array.from(parsed.explain.childNodes).forEach((node) => explain.appendChild(node));
    item.appendChild(explain);
  }

  return { item, rows, explain };
}

/** Put a question back to untouched: no pick, no marking, no explanation. */
function clearQuestion(question) {
  const { item, rows, explain } = question;

  rows.forEach((row) => {
    row.classList.remove('is-correct', 'is-wrong', 'is-answer');
    row.setAttribute('aria-checked', 'false');
    row.setAttribute('tabindex', '0');
    row.querySelector('i').className = ICON_BLANK;
  });

  item.classList.remove('is-answered', 'is-wrong');

  if (explain) {
    explain.hidden = true;
  }
}

function reveal(question, pickedIndex) {
  const { item, rows, explain } = question;
  const picked = rows[pickedIndex];
  if (!picked) {
    return;
  }

  const wasRight = picked.dataset.answer === 'true';

  rows.forEach((row) => {
    row.setAttribute('tabindex', '-1');
    row.setAttribute('aria-checked', String(row === picked));

    if (row.dataset.answer === 'true') {
      // always show where the right answer was
      row.classList.add('is-answer');
      row.querySelector('i').className = ICON_RIGHT;
    }
  });

  picked.classList.add(wasRight ? 'is-correct' : 'is-wrong');
  if (!wasRight) {
    picked.querySelector('i').className = ICON_WRONG;
  }

  item.classList.add('is-answered');
  item.classList.toggle('is-wrong', !wasRight);

  if (explain) {
    explain.hidden = false;
  }

  return wasRight;
}

function setup(card, index) {
  const source = card.querySelector('.quiz-source');
  if (!source) {
    return;
  }

  const parsed = parseSource(source);
  if (parsed.length === 0) {
    return;
  }

  const list = document.createElement('ol');
  list.className = 'quiz-list';

  const questions = parsed.map((q) => {
    const built = buildQuestion(q);
    list.appendChild(built.item);
    return built;
  });

  source.replaceWith(list);

  const meta = card.querySelector('.fold-meta');
  const fill = card.querySelector('.fold-fill');
  const picks = loadState(index, questions.length);

  const update = () => {
    const right = questions.reduce((total, q, i) => {
      const pick = picks[i];
      return total + (pick !== null && q.rows[pick] && q.rows[pick].dataset.answer === 'true' ? 1 : 0);
    }, 0);
    if (meta) {
      meta.textContent = `${right} / ${questions.length}`;
    }
    if (fill) {
      fill.style.width = `${(right / questions.length) * 100}%`;
    }
  };

  questions.forEach((question, i) => {
    if (picks[i] !== null) {
      reveal(question, picks[i]);
    }

    const answer = (row) => {
      if (question.item.classList.contains('is-answered')) {
        return;
      }
      picks[i] = question.rows.indexOf(row);
      reveal(question, picks[i]);
      update();
      saveState(index, picks);
    };

    question.item.addEventListener('click', (event) => {
      // a click that finishes selecting text is not a pick
      if (window.getSelection().toString()) {
        return;
      }
      if (event.target.closest('a')) {
        return;
      }
      const row = event.target.closest('.quiz-option');
      if (row && question.rows.includes(row)) {
        answer(row);
      }
    });

    question.item.addEventListener('keydown', (event) => {
      if (event.key !== ' ' && event.key !== 'Enter') {
        return;
      }
      const row = event.target.closest('.quiz-option');
      if (row && question.rows.includes(row)) {
        event.preventDefault();
        answer(row);
      }
    });
  });

  // the card's window buttons (see fold-card.js)
  card.addEventListener('foldcard:reset', () => {
    questions.forEach((question, i) => {
      clearQuestion(question);
      picks[i] = null;
    });
    update();
    saveState(index, picks);
  });

  card.addEventListener('foldcard:reveal', () => {
    questions.forEach((question, i) => {
      const answer = question.rows.findIndex((row) => row.dataset.answer === 'true');
      if (answer === -1) {
        return; // a question the author left without a `- [x]`
      }
      // clear first: revealing over a wrong pick would leave its marking on
      clearQuestion(question);
      picks[i] = answer;
      reveal(question, answer);
    });
    update();
    saveState(index, picks);
  });

  update();
}

export function initQuizzes() {
  document.querySelectorAll('.quiz-card').forEach(setup);
}
