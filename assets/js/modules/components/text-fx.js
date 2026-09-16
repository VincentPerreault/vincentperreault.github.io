/**
 * Inline text effects driven by markers typed straight into the markdown.
 *
 *   wave    ...between U+223C U+2248 and U+2248 U+223C  ("~=" lookalikes)
 *   rainbow ...between a pair of U+22D2
 *
 * The two nest in either order, e.g. the OSCP (fr) post wraps a rainbow run
 * inside a wave run. Each affected character is wrapped in its own span
 * carrying its position as `--i`, which is what staggers both the wave's
 * animation-delay and the rainbow's starting hue (see _text-fx.scss).
 *
 * Source stays ASCII on purpose -- the markers are spelled as escapes so the
 * file survives any editor/encoding round-trip.
 */

const WAVE_OPEN = ['\u223C\u2248', '~\u2248']; // TILDE OPERATOR (or ASCII ~) + ALMOST EQUAL TO
const WAVE_CLOSE = ['\u2248\u223C', '\u2248~'];
const RAINBOW = '\u22D2'; // DOUBLE INTERSECTION, same char opens and closes

const ANY_MARKER = new RegExp(`${WAVE_OPEN.join('|')}|${RAINBOW}`);

function startsWithAny(text, index, needles) {
  return needles.some((needle) => text.startsWith(needle, index));
}

function hasAnyAt(text, index, needles) {
  return needles.some((needle) => text.indexOf(needle, index) !== -1);
}

/**
 * Split a string into runs of text, each tagged with the effects wrapping it.
 * An unmatched marker is left alone and rendered as the literal character.
 * @returns {{ text: string, fx: string[] }[]}
 */
function tokenize(text) {
  const runs = [];
  const active = [];
  let buffer = '';
  let i = 0;

  const flush = () => {
    if (buffer) {
      runs.push({ text: buffer, fx: active.slice() });
      buffer = '';
    }
  };

  const close = (name) => active.splice(active.indexOf(name), 1);

  while (i < text.length) {
    if (
      !active.includes('wave') &&
      startsWithAny(text, i, WAVE_OPEN) &&
      hasAnyAt(text, i + 2, WAVE_CLOSE)
    ) {
      flush();
      active.push('wave');
      i += 2;
      continue;
    }

    if (active.includes('wave') && startsWithAny(text, i, WAVE_CLOSE)) {
      flush();
      close('wave');
      i += 2;
      continue;
    }

    if (text[i] === RAINBOW) {
      const opening = !active.includes('rainbow');
      if (!opening || text.indexOf(RAINBOW, i + 1) !== -1) {
        flush();
        if (opening) {
          active.push('rainbow');
        } else {
          close('rainbow');
        }
        i += 1;
        continue;
      }
    }

    buffer += text[i];
    i += 1;
  }

  flush();
  return runs;
}

/**
 * Wrap every non-space character of `text` in an indexed span. Spaces stay
 * bare text nodes so the phrase can still wrap onto the next line, while the
 * index keeps counting so the wave stays continuous across them.
 */
function splitChars(text, counter) {
  const frag = document.createDocumentFragment();

  for (const char of text) {
    if (char === ' ') {
      frag.appendChild(document.createTextNode(char));
    } else {
      const span = document.createElement('span');
      span.className = 'fx-char';
      span.style.setProperty('--i', String(counter.value));
      span.textContent = char;
      frag.appendChild(span);
    }
    counter.value += 1;
  }

  return frag;
}

function renderRun(run, counter) {
  if (run.fx.length === 0) {
    // unmarked text does not advance the counter: `--i` counts from the first
    // affected character, and stays continuous across adjacent/nested runs
    return document.createTextNode(run.text);
  }

  const wrapper = document.createElement('span');
  wrapper.className = 'fx';
  wrapper.dataset.fx = run.fx.join(' ');

  // Assistive tech reads this copy; the animated per-character spans would
  // otherwise be spelled out letter by letter.
  const label = document.createElement('span');
  label.className = 'fx-label';
  label.textContent = run.text;
  wrapper.appendChild(label);

  const chars = document.createElement('span');
  chars.setAttribute('aria-hidden', 'true');
  chars.appendChild(splitChars(run.text, counter));
  wrapper.appendChild(chars);

  return wrapper;
}

function transformTextNode(textNode) {
  const text = textNode.nodeValue;
  if (!ANY_MARKER.test(text)) {
    return;
  }

  const runs = tokenize(text);
  if (!runs.some((run) => run.fx.length > 0)) {
    return;
  }

  const frag = document.createDocumentFragment();
  const counter = { value: 0 };
  runs.forEach((run) => frag.appendChild(renderRun(run, counter)));
  textNode.parentNode.replaceChild(frag, textNode);
}

function collectTextNodes(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.closest('pre, code, script, style, .fx')) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const nodes = [];
  let node;
  while ((node = walker.nextNode())) {
    nodes.push(node);
  }
  return nodes;
}

export function initTextFx() {
  const root = document.querySelector('#post-content, .content');
  if (!root || !ANY_MARKER.test(root.textContent)) {
    return;
  }

  collectTextNodes(root).forEach(transformTextNode);
}
