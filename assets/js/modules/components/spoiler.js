/**
 * Discord-style spoiler tags: ||hidden text||
 */

const SPOILER_PATTERN = /\|\|([^|]+?)\|\|/g;

function createSpoilerSpan(text) {
  const span = document.createElement('span');
  span.className = 'spoiler';
  span.setAttribute('role', 'button');
  span.setAttribute('tabindex', '0');
  span.setAttribute('aria-expanded', 'false');
  span.setAttribute('aria-label', 'Spoiler, click to reveal');
  span.textContent = text;
  return span;
}

function toggleSpoiler(span) {
  const revealed = span.classList.toggle('revealed');
  span.setAttribute('aria-expanded', String(revealed));
}

function wrapTextNode(textNode) {
  const text = textNode.nodeValue;

  SPOILER_PATTERN.lastIndex = 0;
  if (!SPOILER_PATTERN.test(text)) {
    return;
  }

  const frag = document.createDocumentFragment();
  let lastIndex = 0;
  let match;

  SPOILER_PATTERN.lastIndex = 0;
  while ((match = SPOILER_PATTERN.exec(text))) {
    if (match.index > lastIndex) {
      frag.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
    }
    frag.appendChild(createSpoilerSpan(match[1]));
    lastIndex = SPOILER_PATTERN.lastIndex;
  }

  if (lastIndex < text.length) {
    frag.appendChild(document.createTextNode(text.slice(lastIndex)));
  }

  textNode.parentNode.replaceChild(frag, textNode);
}

function collectTextNodes(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.closest('pre, code, script, style')) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const nodes = [];
  let node;
  while ((node = walker.nextNode())) {
    nodes.push(node);
  }
  return nodes;
}

export function initSpoilers() {
  const root = document.querySelector('#post-content, .content');
  if (!root || !root.textContent.includes('||')) {
    return;
  }

  collectTextNodes(root).forEach(wrapTextNode);

  root.addEventListener('click', (event) => {
    const spoiler = event.target.closest('.spoiler');
    if (spoiler) {
      toggleSpoiler(spoiler);
    }
  });

  root.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }
    const spoiler = event.target.closest('.spoiler');
    if (spoiler) {
      event.preventDefault();
      toggleSpoiler(spoiler);
    }
  });
}
