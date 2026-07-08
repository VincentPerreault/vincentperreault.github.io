/**
 * DDR song-select style radar for the home page sidebar.
 * Uses the "bare" radar variant (ring, dots and axis descriptions only,
 * no head, no big axis names) so the circle can be as wide as possible.
 * It animates to a post's stats when its card is hovered (or focused via
 * Tab / arrow keys), then eases back to an empty polygon one second after
 * the pointer leaves. Post stats are fetched and analyzed with the same
 * code as the post radar.
 */

import { AXES, radarSvg, polygonPoints, analyzeContent, tweenValues } from './groove-radar';

const RESET_DELAY = 1000;

const IDLE = AXES.reduce((values, axis) => ({ ...values, [axis.key]: 0 }), {});

export function initHomeRadar() {
  const container = document.getElementById('home-radar');
  const list = document.getElementById('post-list');

  if (!container || !list) {
    return;
  }

  container.innerHTML = radarSvg(IDLE, { bare: true });
  container.classList.add('gr-visible');

  const poly = container.querySelector('.gr-poly');

  const cache = new Map();
  const current = { ...IDLE };
  let cancelTween = () => {};
  let resetTimer = 0;
  let activeUrl = null;

  function animateTo(target) {
    cancelTween();
    cancelTween = tweenValues({ ...current }, target, (values) => {
      Object.assign(current, values);
      poly.setAttribute('points', polygonPoints(values, true));
    });
  }

  function statsFor(url) {
    if (!cache.has(url)) {
      cache.set(
        url,
        fetch(url)
          .then((res) => (res.ok ? res.text() : Promise.reject(res.status)))
          .then((html) => {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            const content = doc.querySelector('article .content');
            return content ? analyzeContent(content, doc).values : null;
          })
          .catch(() => null)
      );
    }
    return cache.get(url);
  }

  function select(url) {
    clearTimeout(resetTimer);
    activeUrl = url;
    statsFor(url).then((values) => {
      if (activeUrl === url && values) {
        animateTo(values);
      }
    });
  }

  function scheduleReset() {
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      activeUrl = null;
      animateTo(IDLE);
    }, RESET_DELAY);
  }

  const links = [...list.querySelectorAll('a.post-preview')];
  links.forEach((link) => {
    statsFor(link.href); // warm the cache so the first hover animates instantly
    const card = link.closest('.card-wrapper') || link;
    card.addEventListener('mouseenter', () => select(link.href));
    card.addEventListener('mouseleave', scheduleReset);
    link.addEventListener('focus', () => select(link.href));
    link.addEventListener('blur', scheduleReset);
  });

  // Arrow keys browse the list like a song wheel once a card has focus
  list.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
      return;
    }
    const index = links.indexOf(document.activeElement);
    if (index === -1) {
      return;
    }
    const next = links[index + (event.key === 'ArrowDown' ? 1 : -1)];
    if (next) {
      event.preventDefault();
      next.focus();
    }
  });
}
