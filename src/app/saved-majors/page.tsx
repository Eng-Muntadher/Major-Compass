import { majors } from "../_data/majors";
import SavedMajorsHeader from "../_components/SavedMajorsHeader";
import SavedMajorsContent from "../_components/SavedMajorsContent";
import EmptySavedState from "../_components/EmptySavedState";
import { redirect } from "next/navigation";
import { createClient } from "../_lib/supabase";

export default async function SavedMajors() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

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
