/**
 * Ticking and scoring for the `{{< checklist >}}` shortcode.
 *
 * The card, its title and the fold are server-rendered (see
 * layouts/shortcodes/checklist.html), so the fold works without JS; this only
 * adds the interactive half.
 *
 * The theme's `refactor-content.html` rewrites every `<input type=checkbox>`
 * into a static `<i class="far fa-circle fa-fw">` (or `fas fa-check-circle
 * fa-fw checked` for `- [x]`), so there is no real checkbox to toggle. The
 * behaviour goes on the `<li>` and swaps those exact classes, which keeps the
 * theme's own `--checkbox-*` colours doing the work.
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

/** Stored as one character per item, so an edited list invalidates itself. */
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

function setup(card, index) {
  const list = card.querySelector('.fold-body ul.task-list');
  if (!list) {
    return;
  }

  const items = Array.from(list.querySelectorAll(':scope > li.task-list-item'));
  if (items.length === 0) {
    return;
  }

  const meta = card.querySelector('.fold-meta');
  const fill = card.querySelector('.fold-fill');

  const update = () => {
    const done = items.filter((li) => li.classList.contains('is-checked')).length;
    if (meta) {
      meta.textContent = `${done} / ${items.length}`;
    }
    if (fill) {
      fill.style.width = `${(done / items.length) * 100}%`;
    }
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

  // the card's window buttons (see fold-card.js)
  const setAll = (checked) => {
    items.forEach((li) => setChecked(li, checked));
    update();
    saveState(index, items);
  };

  card.addEventListener('foldcard:reset', () => setAll(false));
  card.addEventListener('foldcard:reveal', () => setAll(true));
}

export function initChecklists() {
  document.querySelectorAll('.checklist-card').forEach(setup);
}
