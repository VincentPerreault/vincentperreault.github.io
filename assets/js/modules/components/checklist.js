/**
 * Makes markdown task lists (`- [ ]`) interactive, and wraps each one in a
 * card matching the code-block chrome.
 *
 * The theme's `refactor-content.html` rewrites every `<input type=checkbox>`
 * into a static `<i class="far fa-circle fa-fw">` (or `fas fa-check-circle
 * fa-fw checked` for `- [x]`), so there is no real checkbox to toggle. This
 * puts the behaviour back on the `<li>` itself and swaps those exact classes,
 * which keeps the theme's own `--checkbox-*` colours doing the work.
 *
 * Ticks are remembered per page in localStorage, so a reader can leave and
 * come back to a half-finished self-assessment.
 */

const ICON_UNCHECKED = 'far fa-circle fa-fw';
const ICON_CHECKED = 'fas fa-check-circle fa-fw checked';
const STORE_PREFIX = 'checklist:';

function storageKey(index) {
  return `${STORE_PREFIX}${window.location.pathname}:${index}`;
}

/** Stored as one character per item, so a reordered list invalidates itself. */
function loadState(index, count) {
  try {
    const raw = window.localStorage.getItem(storageKey(index));
    if (raw && raw.length === count) {
      return raw.split('').map((char) => char === '1');
    }
  } catch (e) {
    /* private mode, blocked storage: fall through to a blank checklist */
  }
  return new Array(count).fill(false);
}

function saveState(index, items) {
  try {
    const raw = items.map((li) => (li.classList.contains('is-checked') ? '1' : '0')).join('');
    window.localStorage.setItem(storageKey(index), raw);
  } catch (e) {
    /* not being able to remember is not worth breaking the page over */
  }
}

function setChecked(li, checked) {
  const icon = li.querySelector('i');
  if (icon) {
    icon.className = checked ? ICON_CHECKED : ICON_UNCHECKED;
  }
  li.classList.toggle('is-checked', checked);
  li.setAttribute('aria-checked', String(checked));
}

function buildCard(list, index) {
  const items = Array.from(list.querySelectorAll(':scope > li.task-list-item'));
  if (items.length === 0) {
    return;
  }

  const card = document.createElement('div');
  card.className = 'checklist-card';

  const head = document.createElement('div');
  head.className = 'checklist-head';
  head.innerHTML =
    '<i class="fas fa-list-check fa-fw" aria-hidden="true"></i>' +
    '<span class="checklist-count"></span>';

  const bar = document.createElement('div');
  bar.className = 'checklist-bar';
  const fill = document.createElement('div');
  fill.className = 'checklist-fill';
  bar.appendChild(fill);

  const body = document.createElement('div');
  body.className = 'checklist-body';

  list.parentNode.insertBefore(card, list);
  card.append(head, bar, body);
  body.appendChild(list);

  const count = head.querySelector('.checklist-count');
  const update = () => {
    const done = items.filter((li) => li.classList.contains('is-checked')).length;
    count.textContent = `${done} / ${items.length}`;
    fill.style.width = `${(done / items.length) * 100}%`;
  };

  const stored = loadState(index, items.length);
  items.forEach((li, i) => {
    li.setAttribute('role', 'checkbox');
    li.setAttribute('tabindex', '0');
    setChecked(li, stored[i]);
  });
  update();

  const toggle = (li) => {
    setChecked(li, !li.classList.contains('is-checked'));
    update();
    saveState(index, items);
  };

  list.addEventListener('click', (event) => {
    // a click that finishes selecting text is not a click on the checkbox
    if (window.getSelection().toString()) {
      return;
    }
    // let links inside an item behave like links
    if (event.target.closest('a')) {
      return;
    }
    const li = event.target.closest('li.task-list-item');
    if (li && items.includes(li)) {
      toggle(li);
    }
  });

  list.addEventListener('keydown', (event) => {
    if (event.key !== ' ' && event.key !== 'Enter') {
      return;
    }
    const li = event.target.closest('li.task-list-item');
    if (li && items.includes(li)) {
      event.preventDefault();
      toggle(li);
    }
  });
}

export function initChecklists() {
  const root = document.querySelector('#post-content, .content');
  if (!root) {
    return;
  }

  root.querySelectorAll('ul.task-list').forEach((list, index) => buildCard(list, index));
}
