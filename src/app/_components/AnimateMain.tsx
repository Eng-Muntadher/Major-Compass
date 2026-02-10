"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { pageTransition } from "../_styles/animations";
import { usePathname } from "next/navigation";

interface AnimatedMainProps {
  children: ReactNode;
}

export default function AnimatedMain({ children }: AnimatedMainProps) {
  const pathname = usePathname();

  useEffect(() => {
    const mainScroll = document.getElementById("main-scroll");
    if (mainScroll) {
      // Use instant scroll, no smooth behavior
      mainScroll.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  return (
    <AnimatePresence mode="wait" key={pathname}>
      <motion.main
        {...pageTransition}
        className="flex-1 min-w-0 overflow-hidden p-4 sm:p-6 lg:p-8"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
