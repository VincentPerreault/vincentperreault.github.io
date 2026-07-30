/**
 * Interactive blog radar playground (About page).
 * Five sliders (with typeable number fields) drive the same radar drawing
 * used at the end of posts, showing the aggregate "blog radar value" and
 * translating each percentage into what it means for a blog post.
 * Values redraw instantly (no tween): sliders fire a stream of input
 * events and any animation reads as the radar lagging behind the thumb.
 */

import {
  WPM,
  CAPS,
  OVERFLOW,
  LONG_WORD,
  AXES,
  radarSvg,
  radarHead,
  grooveValue,
  polygonPoints,
  displayPercent
} from './groove-radar';

const SLIDER_MAX = Math.round(OVERFLOW * 100);

const DEFAULTS = {
  stream: 57,
  voltage: 69,
  air: 48,
  freeze: 22,
  chaos: 70
};

/* The slider descriptions are the only prose in the radar, and the About page
   exists in English and French. One bundle serves both languages (the theme's
   js-selector.html builds it without Hugo params), so the wording is picked at
   runtime from <html lang>. Only these sentences are translated: the axis names
   and subtitles stay in English on purpose, being the DDR-style arcade labels.
   French keeps its typographic no-break space before % and as the thousands
   separator. */
const NBSP = ' ';

const LOCALES = { en: 'en-CA', fr: 'fr-CA' };

const MEANINGS = {
  en: {
    stream: (minutes, words) => `≈ ${minutes} min of reading (~${words} words)`,
    voltage: (peak, avg, count) =>
      `longest paragraph ≈ ${peak} words · ~${avg} words/paragraph · ~${count} paragraphs`,
    freeze: (share, chars) => `≈ ${share}% of the text is code (~${chars} chars of code)`,
    air: (density) =>
      `≈ ${density} visual pts / 1,000 words (media, prompts, spoilers, bold/italic) and their variety`,
    chaos: (longWords, acronyms) =>
      `≈ ${longWords}% ${LONG_WORD}+ char words · ≈ ${acronyms}% acronyms · long sentences`
  },
  fr: {
    stream: (minutes, words) => `≈ ${minutes} min de lecture (~${words} mots)`,
    voltage: (peak, avg, count) =>
      `paragraphe le plus long ≈ ${peak} mots · ~${avg} mots/paragraphe · ~${count} paragraphes`,
    freeze: (share, chars) =>
      `≈ ${share}${NBSP}% du texte est du code (~${chars} caractères de code)`,
    air: (density) =>
      `≈ ${density} pts visuels / 1${NBSP}000 mots (médias, encadrés, spoilers, gras/italique) et leur variété`,
    chaos: (longWords, acronyms) =>
      `≈ ${longWords}${NBSP}% de mots de ${LONG_WORD}+ caractères · ≈ ${acronyms}${NBSP}% d'acronymes · phrases longues`
  }
};

function meaningFor(key, percent) {
  const lang = document.documentElement.lang.toLowerCase().startsWith('fr') ? 'fr' : 'en';
  const locale = LOCALES[lang];
  const text = MEANINGS[lang];
  const frac = percent / 100;
  /* Numbers follow the same language: "2,050" in English, "2 050" in French */
  const int = (value) => Math.round(value).toLocaleString(locale);
  const tenth = (value) =>
    value.toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  switch (key) {
    case 'stream': {
      const minutes = frac * CAPS.stream;
      const words = Math.round((minutes * WPM) / 50) * 50;
      return text.stream(Math.round(minutes), words.toLocaleString(locale));
    }
    case 'voltage':
      return text.voltage(
        int(frac * CAPS.voltage.peak),
        int(frac * CAPS.voltage.avg),
        int(frac * CAPS.voltage.count)
      );
    case 'freeze':
      return text.freeze(int(frac * CAPS.freeze.ratio * 100), int(frac * CAPS.freeze.chars));
    case 'air':
      return text.air(int(frac * CAPS.air.density));
    case 'chaos':
      return text.chaos(
        int(frac * CAPS.chaos.longWords * 100),
        tenth(frac * CAPS.chaos.acronyms * 100)
      );
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

  const poly = container.querySelector('.gr-poly');
  const valEls = container.querySelectorAll('.gr-val');
  const totalEl = container.querySelector('.gr-total-num');

  function refresh() {
    const values = valuesFrom(percents);
    poly.setAttribute('points', polygonPoints(values));
    AXES.forEach((axis, i) => {
      valEls[i].textContent = `${displayPercent(values[axis.key])}%`;
    });
    totalEl.textContent = grooveValue(values);
  }

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
    refresh();
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
