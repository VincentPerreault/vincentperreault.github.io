/**
 * DDR-style "Blog Radar" post statistics.
 * Analyzes the rendered post content and draws a five-axis radar:
 *   STREAM  (top)          - total reading time
 *   CHAOS   (top right)    - depth: long words, acronyms/jargon, long sentences
 *   FREEZE  (bottom right) - code: share of the text + absolute amount
 *   AIR     (bottom left)  - visuals: media, prompts, styling, and their variety
 *   VOLTAGE (top left)     - text density: longest/average/count of paragraphs
 * Short posts are damped on the ratio-based axes by a size factor, so a
 * stub can't max an axis with a handful of elements.
 * The drawing helpers are shared with the interactive playground
 * (groove-radar-playground.js) and the home-page radar (home-radar.js).
 * The home radar uses the "bare" variant: circle, dots and axis
 * descriptions only, with the ring as large as possible.
 */

/* Words per minute, matching the theme's read-time partial */
export const WPM = 180;

/* A word this long (in characters) counts as "long" for CHAOS */
export const LONG_WORD = 9;
const LONG_WORD_RE = new RegExp(`[\\p{L}\\p{N}'’-]{${LONG_WORD},}`, 'gu');

/* Acronyms / jargon: OSCP, AD, SLA, OSCP+, PEN-200... */
const ACRONYM_RE = /\b[A-Z][A-Z0-9]{1,5}\+?\b/g;

/* Value needed on each axis to reach 100% (the outer ring) */
export const CAPS = {
  stream: 20, // minutes of reading (150% overshoot = a 30-min read)
  voltage: { peak: 160, avg: 60, count: 80 }, // longest ¶ words / avg words per ¶ / ¶ count
  freeze: { ratio: 0.35, chars: 5000 }, // share of chars in code / absolute technical mass
  air: { density: 30, count: 40, types: 7 }, // visual pts per 1000 words / absolute pts / kinds
  chaos: { longWords: 0.25, acronyms: 0.05, sentence: 30 } // ratios and avg words per sentence
};

/* A rendered math equation weighs this many "technical" characters */
const MATH_CHARS = 200;

/* Blend weights for the axes built from several measurements */
export const MIX = {
  voltage: { peak: 0.5, avg: 0.3, count: 0.2 },
  freeze: { ratio: 0.6, chars: 0.4 },
  air: { density: 0.5, count: 0.3, variety: 0.2 },
  chaos: { longWords: 0.55, acronyms: 0.25, sentence: 0.2 }
};

/* Ratio-based axes are scaled by sqrt(words / REF_WORDS), capped at 1,
   so short posts can't max an axis with a couple of elements. */
const REF_WORDS = 1500;

/* Values may spill past the ring, up to 150% (DDR-style overshoot) */
export const OVERFLOW = 1.5;

/* Keep a tiny polygon visible even when a stat is zero */
export const FLOOR = 0.05;

/* Geometry: "full" leaves room for the big axis names (post pages,
   playground); "bare" maximizes the ring and only shows descriptions.
   drawMax caps how far the polygon may visually overshoot the ring. */
const GEOM = {
  full: { w: 460, h: 340, cx: 230, cy: 170, r: 96, drawMax: 1.5 },
  bare: { w: 344, h: 276, cx: 172, cy: 152, r: 100, drawMax: 1.5 }
};

/* Axes, starting at the top and going clockwise. Names are blog-flavored;
   `jp` keeps the original DDR label (see https://remywiki.com/GROOVE_RADAR)
   for the playground, currently not rendered. */
export const AXES = [
  { key: 'stream', name: 'READING TIME', sub: 'TIME', jp: '全体密度', angle: -90 },
  { key: 'chaos', name: 'COMPLEXITY', sub: 'DEPTH', jp: '変則度', angle: -18 },
  { key: 'freeze', name: 'TECHNICAL', sub: 'CODE', jp: '踏みっぱ度', angle: 54 },
  { key: 'air', name: 'BREATHER', sub: 'VISUAL', jp: 'ジャンプ度', angle: 126 },
  { key: 'voltage', name: 'HEAVINESS', sub: 'DENSITY', jp: '最大密度', angle: 198 }
];

function polar(geom, angleDeg, radius) {
  const a = (angleDeg * Math.PI) / 180;
  return [geom.cx + Math.cos(a) * radius, geom.cy + Math.sin(a) * radius];
}

/* Percentage shown to the reader: rounded and capped like the polygon */
export function displayPercent(value) {
  return Math.round(Math.min(Math.max(value, 0), OVERFLOW) * 100);
}

/* Transition used when a radar changes target: ~6 frames of a 60 fps game
   (DDR MAX2), so 100ms — fast start, smooth finish (cubic ease-out). */
export const TWEEN_MS = 100;

/**
 * Interpolate between two value sets, calling `onUpdate(values)` each frame.
 * Returns a cancel function. Jumps straight to the target when the user
 * prefers reduced motion.
 */
export function tweenValues(from, to, onUpdate) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    onUpdate({ ...to });
    return () => {};
  }

  let frame = 0;
  const start = performance.now();
  const step = (now) => {
    const t = Math.min((now - start) / TWEEN_MS, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const values = {};
    AXES.forEach((axis) => {
      values[axis.key] = from[axis.key] + (to[axis.key] - from[axis.key]) * eased;
    });
    onUpdate(values);
    if (t < 1) {
      frame = requestAnimationFrame(step);
    }
  };
  frame = requestAnimationFrame(step);
  return () => cancelAnimationFrame(frame);
}

/* The single "blog radar value": sum of the five displayed percentages */
export function grooveValue(values) {
  return AXES.reduce((sum, axis) => sum + displayPercent(values[axis.key]), 0);
}

/* Points of the value polygon, reused when animating between posts */
export function polygonPoints(values, bare = false) {
  const geom = bare ? GEOM.bare : GEOM.full;
  return AXES.map((axis) => {
    const value = Math.min(Math.max(values[axis.key], FLOOR), geom.drawMax);
    return polar(geom, axis.angle, value * geom.r).join(',');
  }).join(' ');
}

function labelFor(geom, axis, percent, tooltip, jp) {
  const [lx, ly] = polar(geom, axis.angle, geom.r + 18);
  const cos = Math.cos((axis.angle * Math.PI) / 180);
  const isTop = Math.abs(cos) < 0.3;
  const anchor = isTop ? 'middle' : cos > 0 ? 'start' : 'end';
  const x = isTop ? lx : cos > 0 ? lx + 4 : lx - 4;
  const nameY = isTop ? ly - 8 : ly + 1;
  const subY = isTop ? ly + 6 : ly + 14;
  const jpY = isTop ? ly - 22 : ly - 13;
  const title = tooltip ? `<title>${tooltip}</title>` : '';
  const jpText = jp
    ? `<text class="gr-jp" x="${x}" y="${jpY}" text-anchor="${anchor}">${title}${axis.jp}</text>`
    : '';

  return `
    ${jpText}
    <text class="gr-name" x="${x}" y="${nameY}" text-anchor="${anchor}">
      ${title}${axis.name}
    </text>
    <text class="gr-sub" x="${x}" y="${subY}" text-anchor="${anchor}">
      ${title}${axis.sub} <tspan class="gr-val">${percent}%</tspan>
    </text>`;
}

/* Bare variant: only the axis description. The two upper-side labels are
   anchored just outside the ring at their height so they never overlap it. */
function bareLabelFor(geom, axis) {
  const rad = (axis.angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const [dx, dy] = polar(geom, axis.angle, geom.r + 8);

  if (Math.abs(cos) < 0.3) {
    // top: centered above the ring
    return `<text class="gr-sub" x="${dx}" y="${dy - 10}" text-anchor="middle">${axis.sub}</text>`;
  }
  if (sin < 0) {
    // upper sides: pushed past the ring's edge at the label's height
    const y = dy - 8;
    const half = Math.sqrt(Math.max(geom.r * geom.r - (y - geom.cy) ** 2, 0));
    const x = cos > 0 ? geom.cx + half + 6 : geom.cx - half - 6;
    const anchor = cos > 0 ? 'start' : 'end';
    return `<text class="gr-sub" x="${x}" y="${y}" text-anchor="${anchor}">${axis.sub}</text>`;
  }
  // bottom: centered below the ring
  return `<text class="gr-sub" x="${dx}" y="${dy + 21}" text-anchor="middle">${axis.sub}</text>`;
}

/**
 * Build the radar SVG markup.
 * `values` maps each axis key to a fraction (1 = 100% = the outer ring).
 * Options: `tooltips` maps axis keys to hover texts, `bare` draws the
 * minimal DDR look, `jp` adds the original Japanese labels above the names.
 */
export function radarSvg(values, { tooltips = {}, bare = false, jp = false } = {}) {
  const geom = bare ? GEOM.bare : GEOM.full;

  const webs = [1, 0.75, 0.5, 0.25]
    .map((scale) => {
      const points = AXES.map((axis) => polar(geom, axis.angle, geom.r * scale).join(',')).join(
        ' '
      );
      const cls = scale === 1 ? 'gr-web' : 'gr-web-inner';
      return `<polygon class="${cls}" points="${points}"></polygon>`;
    })
    .join('');

  const spokes = AXES.map((axis) => {
    const [x, y] = polar(geom, axis.angle, geom.r);
    return `<line class="gr-spoke" x1="${geom.cx}" y1="${geom.cy}" x2="${x}" y2="${y}"></line>`;
  }).join('');

  const dots = AXES.map((axis) => {
    const [x, y] = polar(geom, axis.angle, geom.r + 8);
    return `<circle class="gr-dot" cx="${x}" cy="${y}" r="2.5"></circle>`;
  }).join('');

  const labels = AXES.map((axis) =>
    bare
      ? bareLabelFor(geom, axis)
      : labelFor(geom, axis, displayPercent(values[axis.key]), tooltips[axis.key], jp)
  ).join('');

  return `
    <svg class="gr-svg" viewBox="0 0 ${geom.w} ${geom.h}" role="img" aria-label="Blog radar">
      <circle class="gr-ring" cx="${geom.cx}" cy="${geom.cy}" r="${geom.r}"></circle>
      ${webs}
      ${spokes}
      ${dots}
      ${labels}
      <g class="gr-value">
        <polygon class="gr-poly" points="${polygonPoints(values, bare)}"></polygon>
      </g>
    </svg>`;
}

export function radarHead(subtitle, total) {
  const label = subtitle ? `BLOG RADAR · ${subtitle}` : 'BLOG RADAR';
  return `
    <div class="gr-head">
      <span class="gr-title">${label}</span>
      <span class="gr-total">VALUE <b class="gr-total-num">${total}</b></span>
    </div>`;
}

function countWords(text) {
  const trimmed = text.trim();
  return trimmed === '' ? 0 : trimmed.split(/\s+/).length;
}

function countLongWords(text) {
  return (text.match(LONG_WORD_RE) || []).length;
}

function countAcronyms(text) {
  return (text.match(ACRONYM_RE) || []).length;
}

/* The theme's read-time partial displays its own word count (split of the
   raw HTML on spaces). Use that number for TIME so both always agree.
   Bootstrap tooltips move `title` to `data-bs-original-title` on live pages;
   fetched documents still carry the plain `title`. */
function themeWordCount(root) {
  const el = root && root.querySelector('span.readtime');
  if (!el) {
    return null;
  }
  const source =
    el.getAttribute('data-bs-original-title') ||
    el.getAttribute('title') ||
    el.getAttribute('aria-label') ||
    '';
  const match = source.match(/\d+/);
  return match ? Number(match[0]) : null;
}

/* Ignore icon fonts and code chrome when counting styled text runs */
function styledRuns(content, selector) {
  return [...content.querySelectorAll(selector)].filter(
    (el) => !/(^|\s)fa/.test(el.className) && !el.closest('pre, button')
  ).length;
}

export function analyzeContent(content, root = document) {
  const text = content.textContent;
  const totalWords = themeWordCount(root) || countWords(text);
  const totalChars = text.length;

  // STREAM: total reading time
  const minutes = totalWords / WPM;

  // Short posts are damped on the ratio-based axes
  const sizeFactor = Math.min(Math.sqrt(totalWords / REF_WORDS), 1);

  // VOLTAGE: paragraph density - longest one, average size, and how many
  let peakWords = 0;
  let paraWords = 0;
  let paraCount = 0;
  content.querySelectorAll('p, li').forEach((block) => {
    const words = countWords(block.textContent);
    if (words === 0) {
      return;
    }
    peakWords = Math.max(peakWords, words);
    paraWords += words;
    paraCount += 1;
  });
  const avgWords = paraCount > 0 ? paraWords / paraCount : 0;
  const voltage =
    MIX.voltage.peak * (peakWords / CAPS.voltage.peak) +
    MIX.voltage.avg * (avgWords / CAPS.voltage.avg) +
    MIX.voltage.count * (paraCount / CAPS.voltage.count);

  // FREEZE: share of the text that is code, plus its absolute amount
  let codeChars = 0;
  let codeWords = 0;
  let codeLongWords = 0;
  let codeAcronyms = 0;
  const codeBlocks = [...content.querySelectorAll('pre')];
  content.querySelectorAll('code').forEach((code) => {
    if (!code.closest('pre')) {
      codeBlocks.push(code);
    }
  });
  codeBlocks.forEach((el) => {
    const codeText = el.textContent;
    codeChars += codeText.length;
    codeWords += countWords(codeText);
    codeLongWords += countLongWords(codeText);
    codeAcronyms += countAcronyms(codeText);
  });
  const codeRatio = totalChars > 0 ? codeChars / totalChars : 0;
  // Math equations count toward the technical mass (rendered MathJax
  // containers on live pages, raw $$...$$ delimiters on fetched ones)
  const math =
    content.querySelectorAll('mjx-container, .MathJax').length +
    Math.floor((text.match(/\$\$/g) || []).length / 2);
  const techChars = codeChars + math * MATH_CHARS;
  const freeze =
    MIX.freeze.ratio * (codeRatio / CAPS.freeze.ratio) * sizeFactor +
    MIX.freeze.chars * (techChars / CAPS.freeze.chars);

  // AIR / VISUAL: media, prompts, spoilers, breaks and text styling,
  // blending density, absolute amount, and the variety of what's used.
  // Images weigh the most. Spoilers are built by JS on live pages, so
  // also count their ||...|| source pattern for fetched documents.
  const media = content.querySelectorAll('img, video, iframe').length;
  const promptEls = [...content.querySelectorAll('blockquote[class*="prompt-"]')];
  const prompts = promptEls.length;
  const promptKinds = new Set(
    promptEls.map((b) => [...b.classList].find((c) => c.startsWith('prompt-')))
  ).size;
  const spoilers =
    content.querySelectorAll('.spoiler').length +
    (text.match(/\|\|[^|\n]+\|\|/g) || []).length;
  const breaks = content.querySelectorAll('h2, h3, h4, hr').length;
  const bold = styledRuns(content, 'strong, b');
  const italic = styledRuns(content, 'em, i');
  // Styling runs are capped: an entirely bold post isn't "more visual"
  const elements =
    media * 5 +
    prompts * 2 +
    spoilers * 2 +
    breaks +
    Math.min(bold, 30) * 0.25 +
    Math.min(italic, 30) * 0.25;
  // Floor the length at 300 words so stub posts don't max out the density
  const airDensity = elements / (Math.max(totalWords, 300) / 1000);
  const variety = [
    media > 0,
    prompts > 0,
    promptKinds > 1,
    spoilers > 0,
    bold > 0,
    italic > 0,
    breaks > 0
  ].filter(Boolean).length;
  const air =
    MIX.air.density * (airDensity / CAPS.air.density) * sizeFactor +
    MIX.air.count * (elements / CAPS.air.count) +
    MIX.air.variety * (variety / CAPS.air.types);

  // CHAOS / DEPTH: long words, acronyms/jargon and long sentences,
  // measured on the prose only (code excluded)
  const proseWords = Math.max(totalWords - codeWords, 1);
  const longWords = Math.max(countLongWords(text) - codeLongWords, 0);
  const longRatio = longWords / proseWords;
  const acronyms = Math.max(countAcronyms(text) - codeAcronyms, 0);
  const acronymRatio = acronyms / proseWords;
  const sentences = text.split(/[.!?…]+\s/).filter((s) => s.trim() !== '').length;
  const avgSentence = proseWords / Math.max(sentences, 1);
  const chaos =
    (MIX.chaos.longWords * (longRatio / CAPS.chaos.longWords) +
      MIX.chaos.acronyms * (acronymRatio / CAPS.chaos.acronyms) +
      MIX.chaos.sentence * Math.min(avgSentence / CAPS.chaos.sentence, 1.5)) *
    sizeFactor;

  return {
    values: {
      stream: minutes / CAPS.stream,
      voltage,
      freeze,
      air,
      chaos
    },
    raw: {
      words: totalWords,
      minutes: Math.round(minutes),
      sizeFactor: Math.round(sizeFactor * 100) / 100,
      peakWords,
      avgWords: Math.round(avgWords),
      paragraphs: paraCount,
      codeRatio: Math.round(codeRatio * 100),
      codeChars,
      math,
      media,
      prompts,
      promptKinds,
      spoilers,
      breaks,
      bold,
      italic,
      variety,
      elements: Math.round(elements),
      longRatio: Math.round(longRatio * 100),
      acronymRatio: Math.round(acronymRatio * 1000) / 10,
      avgSentence: Math.round(avgSentence)
    }
  };
}

function tooltipFor(key, raw) {
  switch (key) {
    case 'stream':
      return `~${raw.minutes} min read (${raw.words} words)`;
    case 'voltage':
      return `Longest paragraph: ${raw.peakWords} words · avg ${raw.avgWords} over ${raw.paragraphs} blocks`;
    case 'freeze':
      return `${raw.codeRatio}% of the text is code (~${raw.codeChars} chars${
        raw.math > 0 ? ` · ${raw.math} equations` : ''
      })`;
    case 'air':
      return `${raw.media} media, ${raw.prompts} prompts (${raw.promptKinds} kinds), ${raw.spoilers} spoilers, ${raw.bold}/${raw.italic} bold/italic, ${raw.breaks} breaks · variety ${raw.variety}/7`;
    case 'chaos':
      return `${raw.longRatio}% long words (${LONG_WORD}+ chars) · ${raw.acronymRatio}% acronyms · ~${raw.avgSentence} words/sentence`;
    default:
      return '';
  }
}

export function initGrooveRadar() {
  const container = document.getElementById('groove-radar');
  const content = document.querySelector('article .content');

  if (!container || !content) {
    return;
  }

  const stats = analyzeContent(content);
  const tooltips = {};
  AXES.forEach((axis) => {
    tooltips[axis.key] = tooltipFor(axis.key, stats.raw);
  });

  container.innerHTML =
    radarHead('', grooveValue(stats.values)) + radarSvg(stats.values, { tooltips });
  container.dataset.stats = JSON.stringify(stats.raw);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          container.classList.add('gr-visible');
          observer.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );
  observer.observe(container);
}
