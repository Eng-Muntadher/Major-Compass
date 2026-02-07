"use client";

import { useState } from "react";
import TipSection from "./TipSection";
import { TipsTranslationTypes } from "../translations/en/tips";

interface TipsListProps {
  sections: TipsTranslationTypes["sections"];
}

function TipsList({ sections }: TipsListProps) {
  const [expandedSections, setExpandedSections] = useState([sections[0].id]);

  const HandleToggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId],
    );
  };

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <TipSection
          key={section.id}
          TipSet={section}
          isExpanded={expandedSections.includes(section.id)}
          onToggle={() => HandleToggleSection(section.id)}
        />
      ))}
    </div>
  );
}

export default TipsList;
