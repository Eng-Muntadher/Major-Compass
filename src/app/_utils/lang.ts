export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

// Updated to handle the awaited params
export function getLocaleFromParams(lang: string): Locale {
  return isValidLocale(lang) ? lang : "en";
}
