import { majors } from "../_data/majors";
import SavedMajorsHeader from "../_components/SavedMajorsHeader";
import SavedMajorsContent from "../_components/SavedMajorsContent";
import EmptySavedState from "../_components/EmptySavedState";

export default function SavedMajors() {
  const savedMajorIds = ["computer-science", "civil-engineering"];

  const savedMajors = majors.filter((major) =>
    savedMajorIds.includes(major.id),
  );

  return (
    <div className="max-w-6xl mx-auto">
      <SavedMajorsHeader count={savedMajors.length} />

      {savedMajors.length > 0 ? (
        <SavedMajorsContent majors={savedMajors} />
      ) : (
        <EmptySavedState />
      )}
    </div>
  );
}
