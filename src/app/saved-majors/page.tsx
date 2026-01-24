"use client";

import { useState } from "react";
import { majors } from "../_data/majors";
import SavedMajorsHeader from "../_components/SavedMajorsHeader";
import SavedMajorsContent from "../_components/SavedMajorsContent";
import EmptySavedState from "../_components/EmptySavedState";

export default function SavedMajors() {
  const [savedMajorIds, setSavedMajors] = useState([
    "computer-science",
    "civil-engineering",
  ]);

  const savedMajors = majors.filter((major) =>
    savedMajorIds.includes(major.id),
  );

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to remove all saved majors?")) {
      setSavedMajors([]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <SavedMajorsHeader
        count={savedMajors.length}
        onClearAll={handleClearAll}
      />

      {savedMajors.length > 0 ? (
        <SavedMajorsContent majors={savedMajors} />
      ) : (
        <EmptySavedState />
      )}
    </div>
  );
}
