/** TRANSLATION SYSTEM ENTRY POINT:
 *  Provides a centralized function to retrieve translations based on
 *  the current locale (language). This is the main interface my app uses to
 *  access translated content
 */

import en from "./en/index"; // All English translations
import ar from "./ar/index"; // All Arabic translations
import type { Locale } from "@/app/_utils/lang"; // Type for supported locales ("en" | "ar")

// Translation lookup object
const translations = { en, ar };

/**
 * Get translations for a specific locale. Example:
 * const t = getTranslations("en");
 * console.log(t.home.welcomeMessage); // "Welcome to Major Compass"
 *
 * const tAr = getTranslations("ar");
 * console.log(tAr.home.welcomeMessage); // "مرحباً بك في بوصلة التخصصات"
 */
export function getTranslations(locale: Locale) {
  return translations[locale];
}
