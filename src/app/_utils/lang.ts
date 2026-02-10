/* This file provides type-safe locale handling for the i18n system.
 * To ensures only valid locales ("en" or "ar") are used throughout the app.
 */

export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

// Type guard to check if a string is a valid locale.
export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

// Safely extract locale from URL params with fallback to English.
export function getLocaleFromParams(lang: string): Locale {
  return isValidLocale(lang) ? lang : "en";
}
