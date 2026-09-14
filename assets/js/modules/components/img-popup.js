/**
 * Set up image popup
 *
 * Dependencies: https://github.com/biati-digital/glightbox
 *
 * Overrides the theme's copy: ported to the 7.6.0 `Theme` API, and the
 * light/dark swap now returns the new pair (upstream fix) — the theme's
 * version mutated local variables only, so a second theme switch reopened
 * the images of the previous mode.
 */

const lightImages = '.popup:not(.dark)';
const darkImages = '.popup:not(.light)';
let selector = lightImages;

function swapImages(current, reverse) {
  if (selector === lightImages) {
    selector = darkImages;
  } else {
    selector = lightImages;
  }

  if (reverse === null) {
    reverse = GLightbox({ selector: `${selector}` });
  }

  return [reverse, current];
}

export function imgPopup() {
  if (document.querySelector('.popup') === null) {
    return;
  }

  const hasDualImages = !(
    document.querySelector('.popup.light') === null &&
    document.querySelector('.popup.dark') === null
  );

  if (Theme.isDark) {
    selector = darkImages;
  }

  let current = GLightbox({ selector: `${selector}` });

  if (hasDualImages && Theme.isToggleable) {
    let reverse = null;

    window.addEventListener('message', (event) => {
      if (
        event.source === window &&
        event.data &&
        event.data.id === Theme.eventId
      ) {
        [current, reverse] = swapImages(current, reverse);
      }
    });
  }
}
