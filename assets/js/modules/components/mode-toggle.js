/**
 * Sets up the mode toggle dropdown, allowing users to switch between
 * light, dark, and system themes.
 *
 * Ported from the upstream Jekyll Chirpy theme (v7.6.0, PR #2756), which
 * replaced the old single "flip" button with a three-way menu.
 *
 * Dependencies:
 *  - Theme (assets/js/modules/theme.js, loaded as a global in <head>)
 */

import 'js/bootstrap/src/dropdown.js';

const ACTIVE_CLASS = 'active';
const dropdown = document.querySelector('#mode-toggle + .dropdown-menu');
const activeMode = Theme.isSystemTheme
  ? Theme.Mode.SYSTEM
  : Theme.resolvedTheme;

export function modeWatcher() {
  if (!Theme.isToggleable || !dropdown) {
    return;
  }

  dropdown.querySelectorAll('.dropdown-item').forEach((option) => {
    const mode = option.dataset.themeMode;
    if (mode === activeMode) {
      option.classList.add(ACTIVE_CLASS);
    }
  });

  dropdown.addEventListener('click', (event) => {
    const current = event.target.closest('.dropdown-item');

    if (!current) {
      return;
    }

    const lastActive = dropdown.querySelector(`.${ACTIVE_CLASS}`);

    if (lastActive === current) {
      return;
    }

    lastActive?.classList.remove(ACTIVE_CLASS);
    current.classList.add(ACTIVE_CLASS);
    Theme.update(current.dataset.themeMode);
  });
}
