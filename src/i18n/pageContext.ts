import { defaultLocale, isLocale, type Locale } from "@site/i18n/config";
import { getTranslations } from "@site/i18n/translations";

export function resolvePageLocale(param?: string): Locale {
  if (param && isLocale(param) && param !== defaultLocale) {
    return param;
  }
  return defaultLocale;
}

export function pageContext(param?: string) {
  const locale = resolvePageLocale(param);
  return { locale, t: getTranslations(locale) };
}
