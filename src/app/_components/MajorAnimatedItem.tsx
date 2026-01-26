"use client";

import { motion } from "framer-motion";
import { staggerItem } from "../_styles/animations";
import { ReactNode } from "react";

/* Since Framer Motion needs to be on the client, I can't just make the entire route or component CSR
 just beacuse of that.
 So I made these small reusable components that are CSR while the content insde them is SSR */

interface MajorAnimatedItemProps {
  children: ReactNode;
}

function MajorAnimatedItem({ children }: MajorAnimatedItemProps) {
  return (
    <motion.li variants={staggerItem} role="listitem">
      {children}
    </motion.li>
  );
}

export default MajorAnimatedItem;
