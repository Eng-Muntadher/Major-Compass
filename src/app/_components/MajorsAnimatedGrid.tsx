"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "../_styles/animations";
import { ReactNode } from "react";

/* Since Framer Motion needs to be on the client, I can't just make the entire route or component CSR
 just beacuse of that.
 So I made these small reusable components that are CSR while the content insde them is SSR */

interface MajorsAnimatedGridProps {
  children: ReactNode;
}

function MajorsAnimatedGrid({ children }: MajorsAnimatedGridProps) {
  return (
    <motion.ul
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      role="list"
    >
      {children}
    </motion.ul>
  );
}

export default MajorsAnimatedGrid;
