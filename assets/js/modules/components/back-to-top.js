/**
 * Back-to-top button with a reading-progress ring.
 *
 * Overrides the theme module's copy, which only toggled the button. The ring
 * (an SVG circle inside the button, see layouts/_default/baseof.html) fills
 * clockwise from 12 o'clock as the page is read: a quarter of the ring means
 * about 25% read.
 *
 * On posts and pages "read" means the article body, not the whole document:
 * the ring is full once the end of `.content` reaches the bottom of the
 * viewport, so the tags, share bar, related posts and footer underneath don't
 * leave it stuck around 80%. Pages without an article body (home, listings)
 * fall back to the full scroll height.
 */

const SHOW_AFTER = 50; // px scrolled before the button appears
const RING_LENGTH = 100; // matches pathLength / stroke-dasharray on the circle

export function back2top() {
  const btn = document.getElementById('back-to-top');

  if (!btn) {
    return;
  }

  const ring = btn.querySelector('.progress-ring__value');
  const content = document.querySelector('main > article > .content');
  let ticking = false;

  /** Reading progress, from 0 to 1 */
  function progress() {
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    let end = maxScroll;

    if (content) {
      /* Scroll position at which the article's last line enters the viewport.
         Measured on every update, since lazy images and fold cards change
         the article's height after load. */
      const contentEnd =
        content.getBoundingClientRect().bottom +
        window.scrollY -
        window.innerHeight;

      end = Math.min(maxScroll, contentEnd);
    }

    if (end <= 0) {
      return 1; // everything already fits on screen
    }

    return Math.min(1, Math.max(0, window.scrollY / end));
  }

  function update() {
    ticking = false;
    btn.classList.toggle('show', window.scrollY > SHOW_AFTER);

    if (ring) {
      ring.style.strokeDashoffset = RING_LENGTH * (1 - progress());
    }
  }

  function requestUpdate() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });

  /* The page can change height without scrolling: a quiz or checklist card
     folding open or shut, a lazy image arriving. The scroll position stays
     put, but it is now a different share of the article, so the ring has to
     be redrawn. Watching the height covers every such cause at once. */
  if ('ResizeObserver' in window) {
    new ResizeObserver(requestUpdate).observe(content || document.body);
  }

  update(); // a reload can restore a scrolled position

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0 });
  });
}
