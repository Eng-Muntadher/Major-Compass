"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { pageTransition } from "../_styles/animations";
import { usePathname } from "next/navigation";

interface AnimatedMainProps {
  children: ReactNode;
}

export default function AnimatedMain({ children }: AnimatedMainProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" key={pathname}>
      <motion.main {...pageTransition} className="flex-1 p-4 sm:p-6 lg:p-8">
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
