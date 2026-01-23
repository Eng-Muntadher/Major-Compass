"use client";

import { useState } from "react";
import { majors } from "../_data/majors";
import CompareHeader from "../_components/CompareHeader";
import MajorSelectionPanel from "../_components/MajorSelectionPanel";
import ComparisonTable from "../_components/ComparisonTable";
import EmptyComparisonState from "../_components/EmptyComparisonState";

export default function CompareMajors() {
  const [major1Id, setMajor1Id] = useState<string>("");
  const [major2Id, setMajor2Id] = useState<string>("");

  const major1 = majors.find((m) => m.id === major1Id);
  const major2 = majors.find((m) => m.id === major2Id);

  const showComparison = major1 && major2;

  return (
    <div className="max-w-7xl mx-auto">
      <CompareHeader />

      <MajorSelectionPanel
        majors={majors}
        major1Id={major1Id}
        major2Id={major2Id}
        onMajor1Change={setMajor1Id}
        onMajor2Change={setMajor2Id}
      />

      {showComparison ? (
        <ComparisonTable major1={major1} major2={major2} />
      ) : (
        <EmptyComparisonState />
      )}
    </div>
  );
}
