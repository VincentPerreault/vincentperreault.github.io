/**
 * Update month/day to locale datetime
 *
 * Requirement: <https://github.com/iamkun/dayjs>
 *
 * Overrides the theme's copy with upstream Chirpy 7.6.0 (PR #2759): the
 * timestamp now rides on the standard `datetime` attribute (valid, machine
 * readable HTML) instead of the custom `data-ts`. Elements are matched on
 * `data-df` so the theme's own `data-ts` markup (the archives page) keeps
 * being localized as well.
 */

/* A tool for locale datetime */
class LocaleHelper {
  static formatAttr = 'data-df';
  static datetimeAttr = 'datetime';
  static legacyAttr = 'data-ts'; /* unix timestamp, pre-7.6.0 markup */

  static get locale() {
    return document.documentElement.getAttribute('lang').substring(0, 2);
  }

  static getDate(elem) {
    const datetime = elem.getAttribute(this.datetimeAttr);

    if (datetime) {
      return dayjs(datetime);
    }

    return dayjs.unix(Number(elem.getAttribute(this.legacyAttr)));
  }
}

export function initLocaleDatetime() {
  dayjs.locale(LocaleHelper.locale);
  dayjs.extend(window.dayjs_plugin_localizedFormat);

  document.querySelectorAll(`[${LocaleHelper.formatAttr}]`).forEach((elem) => {
    const date = LocaleHelper.getDate(elem);

    if (!date.isValid()) {
      return;
    }

    elem.textContent = date.format(elem.dataset.df);
    elem.removeAttribute(LocaleHelper.legacyAttr);
    delete elem.dataset.df;

    // setup tooltips
    if ('bsToggle' in elem.dataset && elem.dataset.bsToggle === 'tooltip') {
      // see: https://day.js.org/docs/en/display/format#list-of-localized-formats
      elem.dataset.bsTitle = date.format('llll');
    }
  });
}
