import { en, pt, type Key } from './strings';

export const LANGS = ['en', 'pt'] as const;
export type Lang = (typeof LANGS)[number];
export type L10n = { en: string; pt: string };

const tables: Record<Lang, Record<Key, string>> = { en, pt };

/** Interface string. Throws at build time on a missing key, so nothing ships untranslated. */
export function t(lang: Lang, key: Key, vars: Record<string, string | number> = {}): string {
  const s = tables[lang][key];
  if (s === undefined) throw new Error(`Missing ${lang} string: ${key}`);
  return s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}

/** Pick one language from a bilingual content field. */
export const pick = (lang: Lang, v: L10n | string) => (typeof v === 'string' ? v : v[lang]);

export const htmlLang = (lang: Lang) => (lang === 'pt' ? 'pt-PT' : 'en');
export const ogLocale = (lang: Lang) => (lang === 'pt' ? 'pt_PT' : 'en_GB');
export const other = (lang: Lang): Lang => (lang === 'en' ? 'pt' : 'en');

/** "Dec 2023" / "dez. 2023" */
const MONTHS = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  pt: ['jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'],
};
export function month(lang: Lang, ym: string): string {
  const [y, m] = ym.split('-').map(Number);
  return `${MONTHS[lang][m - 1]} ${y}`;
}

/** Strings the demo needs on the client. */
export function demoStrings(lang: Lang) {
  const k = (key: string) => t(lang, `fd.${key}` as Key);
  const keys = ['level', 'lives', 'board', 'restart', 'next', 'again', 'intro', 'wrong', 'over', 'solved', 'star', 'cell', 'empty', 'marked', 'fruit'];
  const out: Record<string, unknown> = Object.fromEntries(keys.map((x) => [x, k(x)]));
  out.fruits = Object.fromEntries(['cherry', 'orange', 'banana', 'blueberry', 'grape', 'pear'].map((f) => [f, t(lang, `fruit.${f}` as Key)]));
  return out;
}
