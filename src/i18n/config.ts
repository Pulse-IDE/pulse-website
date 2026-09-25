export const locales = [
  "en",
  "it",
  "es",
  "fr",
  "de",
  "pt",
  "ja",
  "zh",
  "ko",
  "ru",
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  it: "Italiano",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  pt: "Português",
  ja: "日本語",
  zh: "中文",
  ko: "한국어",
  ru: "Русский",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localizedPath(locale: Locale, segment: string): string {
  const path = segment.startsWith("/") ? segment : `/${segment}`;
  if (locale === defaultLocale) {
    return path === "/" ? "/" : path;
  }
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}
