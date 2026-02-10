"use client";

import { useState } from "react";
import { Major } from "../_lib/types";
import MajorSelectionPanel from "./MajorSelectionPanel";
import ComparisonTable from "./ComparisonTable";
import EmptyComparisonState from "./EmptyComparisonState";
import { CompareTranslations } from "@/app/translations/en/compare";

interface CompareMajorsClientWrapperProps {
  majors: Major[] | null;
  t: Omit<CompareTranslations, "header">;
}

export default function CompareMajorsClientWrapper({
  majors,
  t,
}: CompareMajorsClientWrapperProps) {
  const [major1Id, setMajor1Id] = useState("");
  const [major2Id, setMajor2Id] = useState("");

  // Majors are already fetched and cached using (ISG), we just have to find and compare them
  const major1 = majors?.find((m) => m.id === major1Id);
  const major2 = majors?.find((m) => m.id === major2Id);

  const showComparison = major1 && major2;

  return (
    <>
      <MajorSelectionPanel
        majors={majors}
        major1Id={major1Id}
        major2Id={major2Id}
        onMajor1Change={setMajor1Id}
        onMajor2Change={setMajor2Id}
        t={t.selection}
      />

      {showComparison ? (
        <ComparisonTable
          major1={major1}
          major2={major2}
          t={t.comparisonTable}
        />
      ) : (
        <EmptyComparisonState t={t.emptyState} />
      )}
    </>
  );
}
