"use client";

import { useRouter, usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import type { Locale } from "@/app/_utils/lang";

export function LanguageToggle({
  currentLanguage,
}: {
  currentLanguage: Locale;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleToggle = () => {
    const nextLocale: Locale = currentLanguage === "en" ? "ar" : "en";

    // Set cookie (1 year expiry)
    document.cookie = `locale=${nextLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;

    // Replace locale in current path
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    const newPath = segments.join("/");

    router.push(newPath);
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent outline-none"
      aria-label={
        currentLanguage === "en" ? "Switch to Arabic" : "Switch to English"
      }
    >
      <Globe className="w-5 h-5" aria-hidden="true" />
      <span className="text-xs hidden sm:inline">
        {currentLanguage === "en" ? "ع" : "EN"}
      </span>
    </button>
  );
}
