"use client";

import { useState } from "react";
import TipSection from "./TipSection";
import { tips } from "../_data/tips";

function TipsList() {
  const [expandedSections, setExpandedSections] = useState([tips[0].id]);

  const HandleToggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId],
    );
  };

  return (
    <div className="space-y-4">
      {tips.map((tips) => (
        <TipSection
          key={tips.id}
          TipSet={tips}
          isExpanded={expandedSections.includes(tips.id)}
          onToggle={() => HandleToggleSection(tips.id)}
        />
      ))}
    </div>
  );
}

export default TipsList;
