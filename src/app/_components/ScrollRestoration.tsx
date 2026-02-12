"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function ScrollRestoration() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 1. Disable browser's automatic scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // 2. Reset ALL possible scroll positions on mount
    const resetAllScrolls = () => {
      // Reset window/document scroll
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Reset the actual scroll container
      const mainScroll = document.getElementById("main-scroll");
      if (mainScroll) {
        mainScroll.scrollTop = 0;
        mainScroll.scrollLeft = 0;
      }
    };

    // Reset immediately
    resetAllScrolls();

    // Also reset after a tiny delay to catch late scroll restoration
    const timeoutId = setTimeout(resetAllScrolls, 10);

    return () => clearTimeout(timeoutId);
  }, []); // Run only once on mount

  // Reset on pathname OR searchParams change (Because we need it for pagination in the browse page)
  useEffect(() => {
    // Force scroll reset on navigation AND query param changes
    const mainScroll = document.getElementById("main-scroll");
    if (mainScroll) {
      mainScroll.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

    // Ensure document doesn't scroll
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, searchParams]);

  return null;
}
