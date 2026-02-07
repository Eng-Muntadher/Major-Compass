import { motion, AnimatePresence } from "framer-motion";
import TipSectionContent from "./TipSectionContent";
import TipSectionHeader from "./TipSectionHeader";

interface TipSectionProps {
  TipSet: {
    id: string;
    title: string;
    icon: string;
    content: readonly {
      heading: string;
      points: readonly string[];
    }[];
  };
  isExpanded: boolean;
  onToggle: () => void;
}

function TipSection({ TipSet, isExpanded, onToggle }: TipSectionProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <TipSectionHeader
        tipInfo={TipSet}
        isExpanded={isExpanded}
        onToggle={onToggle}
      />

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <TipSectionContent content={TipSet.content} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TipSection;
