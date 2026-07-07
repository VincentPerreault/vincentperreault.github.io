/**
 * Interactive blog radar playground (About page).
 * Five sliders (with typeable number fields) drive the same radar drawing
 * used at the end of posts, showing the aggregate "blog radar value" and
 * translating each percentage into what it means for a blog post.
 */

import {
  WPM,
  CAPS,
  OVERFLOW,
  LONG_WORD,
  AXES,
  radarSvg,
  radarHead,
  grooveValue
} from './groove-radar';

const SLIDER_MAX = Math.round(OVERFLOW * 100);

const DEFAULTS = {
  stream: 57,
  voltage: 69,
  air: 48,
  freeze: 22,
  chaos: 70
};

function meaningFor(key, percent) {
  const frac = percent / 100;
  switch (key) {
    case 'stream': {
      const minutes = frac * CAPS.stream;
      const words = Math.round((minutes * WPM) / 50) * 50;
      return `≈ ${Math.round(minutes)} min of reading (~${words.toLocaleString()} words)`;
    }
    case 'voltage':
      return `longest paragraph ≈ ${Math.round(frac * CAPS.voltage.peak)} words · ~${Math.round(
        frac * CAPS.voltage.avg
      )} words/paragraph · ~${Math.round(frac * CAPS.voltage.count)} paragraphs`;
    case 'freeze':
      return `≈ ${Math.round(frac * CAPS.freeze.ratio * 100)}% of the text is code (~${Math.round(
        frac * CAPS.freeze.chars
      ).toLocaleString()} chars of code)`;
    case 'air':
      return `≈ ${Math.round(
        frac * CAPS.air.density
      )} visual pts / 1,000 words (media, prompts, spoilers, bold/italic) and their variety`;
    case 'chaos':
      return `≈ ${Math.round(frac * CAPS.chaos.longWords * 100)}% ${LONG_WORD}+ char words · ≈ ${(
        frac *
        CAPS.chaos.acronyms *
        100
      ).toFixed(1)}% acronyms · long sentences`;
    default:
      return '';
  }
}

function controlRow(axis, percent) {
  return `
    <div class="gr-control" data-key="${axis.key}">
      <div class="gr-row">
        <span class="gr-label">${axis.name}</span>
        <input
          type="range"
          min="0"
          max="${SLIDER_MAX}"
          value="${percent}"
          aria-label="${axis.name}"
        >
        <input
          class="gr-num"
          type="number"
          min="0"
          max="${SLIDER_MAX}"
          step="1"
          value="${percent}"
          aria-label="${axis.name} value"
        >
      </div>
      <p class="gr-meaning">${meaningFor(axis.key, percent)}</p>
    </div>`;
}

function valuesFrom(percents) {
  const values = {};
  AXES.forEach((axis) => {
    values[axis.key] = percents[axis.key] / 100;
  });
  return values;
}

export function initGrooveRadarPlayground() {
  const container = document.getElementById('groove-radar-playground');

  if (!container) {
    return;
  }

  const percents = { ...DEFAULTS };

  container.innerHTML = `
    ${radarHead('PLAYGROUND', grooveValue(valuesFrom(percents)))}
    <div class="gr-canvas">${radarSvg(valuesFrom(percents))}</div>
    <div class="gr-controls">
      ${AXES.map((axis) => controlRow(axis, percents[axis.key])).join('')}
    </div>`;
  container.classList.add('gr-visible');

  container.addEventListener('input', (event) => {
    const control = event.target.closest('.gr-control');
    const type = event.target.type;
    if (!control || (type !== 'range' && type !== 'number')) {
      return;
    }

    const raw = Number(event.target.value);
    if (event.target.value === '' || Number.isNaN(raw)) {
      return; // still typing in the number field
    }

    const key = control.dataset.key;
    percents[key] = Math.min(Math.max(raw, 0), SLIDER_MAX);

    const other = type === 'range' ? '.gr-num' : 'input[type="range"]';
    control.querySelector(other).value = percents[key];
    control.querySelector('.gr-meaning').textContent = meaningFor(key, percents[key]);
    container.querySelector('.gr-canvas').innerHTML = radarSvg(valuesFrom(percents));
    container.querySelector('.gr-total-num').textContent = grooveValue(valuesFrom(percents));
  });

  // Snap the number field back to the clamped value once editing is done
  container.addEventListener(
    'change',
    (event) => {
      if (event.target.type !== 'number') {
        return;
      }
      const control = event.target.closest('.gr-control');
      if (control) {
        event.target.value = percents[control.dataset.key];
      }
    },
    true
  );
}
