/**
 * Home page sort switch: order the post list by publish date or by last
 * update, with a DDR song-wheel style transition.
 *
 * layouts/index.html renders every post with its rank in both orders
 * (`data-added`, `data-updated`) and hides the ones off the current page.
 * Switching reorders the cards and flips `hidden` so the page shows the right
 * slice of the chosen order. The choice is remembered across visits and
 * pages.
 *
 * The transition copies the arcade's banner swap: each piece of a card
 * (title, description, image, metadata) is squeezed flat against its own top
 * edge, the content changes while nothing is visible, then each piece unrolls
 * back down. The card slots themselves stay put. Each half lasts TWEEN_MS,
 * the same six-frame beat as the blog radar morph.
 *
 * Like the radar tween, it deliberately ignores prefers-reduced-motion: it is
 * a 200ms in-place squash with no movement across the screen, and it is the
 * interaction itself rather than decoration.
 */

import { TWEEN_MS } from './groove-radar';

const STORAGE_KEY = 'home-sort';
const MODES = ['added', 'updated'];
const PARTS = '.card-title, .card-text, .post-meta, img';

const FLAT = { transform: 'scaleY(0)', transformOrigin: '50% 0' };
const FULL = { transform: 'scaleY(1)', transformOrigin: '50% 0' };

function stored() {
  try {
    const mode = localStorage.getItem(STORAGE_KEY);
    return MODES.includes(mode) ? mode : MODES[0];
  } catch {
    return MODES[0];
  }
}

function store(mode) {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    /* private mode: the switch still works for this page view */
  }
}

export function initHomeSort() {
  const list = document.getElementById('post-list');
  const bar = document.getElementById('post-sort');

  if (!list || !bar) {
    return;
  }

  const cards = [...list.querySelectorAll('.card-wrapper')];
  const buttons = [...bar.querySelectorAll('button[data-sort]')];
  const start = Number(list.dataset.pageStart) || 0;
  const size = Number(list.dataset.pageSize) || cards.length;

  let current = list.dataset.sort;
  let target = current;
  let running = [];
  let busy = false;

  const visibleParts = () =>
    cards.filter((card) => !card.hidden).flatMap((card) => [...card.querySelectorAll(PARTS)]);

  /* Reorder the cards and show this page's slice of that order. */
  function apply(mode) {
    current = mode;
    list.dataset.sort = mode;

    cards
      .slice()
      .sort((a, b) => a.dataset[mode] - b.dataset[mode])
      .forEach((card) => {
        const rank = Number(card.dataset[mode]);
        card.hidden = rank < start || rank >= start + size;
        list.append(card);
      });

    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.sort === mode));
    });
  }

  function play(parts, from, to, easing) {
    running = parts.map((part) =>
      part.animate([from, to], { duration: TWEEN_MS, easing, fill: 'forwards' })
    );

    /* `finished` only settles while the browser is producing frames, so a
       tab switched to the background mid-swap would leave the list squeezed
       flat. The timer guarantees the swap completes regardless. */
    return Promise.race([
      Promise.all(running.map((animation) => animation.finished)),
      new Promise((resolve) => setTimeout(resolve, TWEEN_MS + 50))
    ]);
  }

  async function run() {
    busy = true;

    while (current !== target) {
      const mode = target;

      await play(visibleParts(), FULL, FLAT, 'ease-in');
      const squeezed = running;

      apply(mode);

      /* The pointer has not moved but the post under it has: tell the home
         radar, which listens for mouseenter on the cards. */
      list.querySelector('.card-wrapper:hover')?.dispatchEvent(new MouseEvent('mouseenter'));

      /* Start the cards now on screen flat, then release the old squeeze. */
      const unroll = play(visibleParts(), FLAT, FULL, 'ease-out');
      squeezed.forEach((animation) => animation.cancel());
      await unroll;

      running.forEach((animation) => animation.cancel());
      running = [];
    }

    busy = false;
  }

  function switchTo(mode) {
    target = mode;
    store(mode);

    if (!busy) {
      run().catch(() => {
        /* an animation was torn down mid-flight: land on the target */
        busy = false;
        apply(target);
      });
    }
  }

  /* Restore the saved order without animating, then reveal the switch. */
  const saved = stored();
  if (saved !== current) {
    target = saved;
    apply(saved);
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => switchTo(button.dataset.sort));
  });

  bar.hidden = false;
}
