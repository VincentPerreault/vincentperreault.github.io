/**
 * macOS-style window buttons on the foldable cards.
 *
 *   close (x)     folds the card
 *   toggle (-)    folds it if open, opens it if folded
 *   open (expand) unfolds it
 *
 * The buttons sit inside the <summary>, so every activation would otherwise
 * ALSO trigger the native toggle and undo itself. Both the click and the
 * keyboard activation are stopped here before that happens.
 */

/**
 * The red and green buttons act on the card's CONTENT, not on the fold:
 * three buttons that all just opened and closed were indistinguishable in
 * use, and pressing one whose state was already current did nothing at all.
 *
 * What "clear" and "fill" mean belongs to the component, so this only
 * announces the intent; checklist.js and quiz.js listen for it. Both also
 * open the card, so a press always shows its own result.
 */
function act(card, light) {
  if (light.classList.contains('fold-light-close')) {
    card.open = true;
    card.dispatchEvent(new CustomEvent('foldcard:reset'));
  } else if (light.classList.contains('fold-light-open')) {
    card.open = true;
    card.dispatchEvent(new CustomEvent('foldcard:reveal'));
  } else {
    card.open = !card.open;
  }
}

function setup(card) {
  const head = card.querySelector('.fold-head');
  if (!head) {
    return;
  }

  head.addEventListener('click', (event) => {
    const light = event.target.closest('.fold-light');
    if (!light) {
      return;
    }
    event.preventDefault(); // the <summary> would toggle on top of us
    event.stopPropagation();
    act(card, light);
  });

  // Space and Enter reach the button first, but <summary> would act on them
  // too; swallow them here and let the click handler above do the work.
  head.addEventListener('keydown', (event) => {
    if (event.key !== ' ' && event.key !== 'Enter') {
      return;
    }
    if (event.target.closest('.fold-light')) {
      event.stopPropagation();
    }
  });
}

/**
 * Flag a card while its header is actually pinned, so the CSS can show a
 * shadow only then. `<summary>` has to be the first child of `<details>`, so
 * there is nowhere to put an IntersectionObserver sentinel above it; reading
 * the header's own offset is the reliable way to know it is stuck.
 *
 * The listener is shared by every card and the work is deferred to an
 * animation frame, so scrolling stays cheap no matter how many are on a page.
 */
function trackPinned(cards) {
  let frame = null;

  const topbar = document.querySelector('#topbar-wrapper');

  /**
   * How far down a pinned header has to sit to clear the theme's topbar.
   * That bar hides on the way down and returns on the way up, so the only
   * honest answer is wherever its bottom edge is right now; once it has
   * scrolled or slid away the offset collapses to 0 on its own.
   */
  const stickyTop = () => {
    if (!topbar) {
      return 0;
    }
    const box = topbar.getBoundingClientRect();
    return Math.max(0, Math.min(box.bottom, box.height));
  };

  const update = () => {
    frame = null;
    document.documentElement.style.setProperty('--fold-sticky-top', `${stickyTop()}px`);

    cards.forEach((card) => {
      const head = card.querySelector('.fold-head');
      if (!head || !card.open) {
        card.classList.remove('is-pinned');
        return;
      }
      // While stuck, sticky holds the header exactly at its offset. Above the
      // card it sits lower; on the way out the card's bottom edge drags it
      // higher. So equality -- not `<=` -- is what "currently pinned" means,
      // and it drops the shadow as the header slides out rather than after.
      const offset = parseFloat(window.getComputedStyle(head).top) || 0;
      const pinned = Math.abs(head.getBoundingClientRect().top - offset) < 1;
      card.classList.toggle('is-pinned', pinned);
    });
  };

  const schedule = () => {
    if (frame === null) {
      frame = window.requestAnimationFrame(update);
    }
  };

  /**
   * Collapsing a card deletes everything below its header, so the sticky
   * header un-sticks and snaps back to the card's top -- far above where the
   * reader was -- and the rest of the article leaps up past them.
   *
   * Pulling the scroll position back by the same amount lands the card right
   * where its header was already pinned, so closing reads as the text below
   * rising to meet the header instead of the page teleporting.
   */
  const anchorOnClose = (card) => {
    if (card.open) {
      return;
    }
    const offset = stickyTop();
    const top = card.getBoundingClientRect().top;
    if (top < offset) {
      // `instant` so it cannot inherit a smooth scroll and animate the jump
      window.scrollBy({ top: top - offset, behavior: 'instant' });
    }
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  cards.forEach((card) =>
    card.addEventListener('toggle', () => {
      anchorOnClose(card);
      update();
    })
  );
  update();
}

export function initFoldCards() {
  const cards = Array.from(document.querySelectorAll('.fold-card'));
  if (cards.length === 0) {
    return;
  }

  cards.forEach(setup);
  trackPinned(cards);
}
