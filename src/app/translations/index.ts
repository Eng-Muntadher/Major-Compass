import en from "./en/index";
import ar from "./ar/index";
import type { Locale } from "@/app/_utils/lang";

const translations = { en, ar };

export function getTranslations(locale: Locale) {
  return translations[locale];
}
