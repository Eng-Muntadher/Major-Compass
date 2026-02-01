import SavedMajorsHeader from "../_components/SavedMajorsHeader";
import SavedMajorsContent from "../_components/SavedMajorsContent";
import EmptySavedState from "../_components/EmptySavedState";
import { redirect } from "next/navigation";
import { createClient } from "../_lib/supabase";
import { getBookmarkedMajors } from "../actions";

export default async function SavedMajors() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Get user's profile data
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("bookmarks")
    .eq("id", user?.id)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
  }

  const savedMajorsIds = profile?.bookmarks;
  const savedMajors = await getBookmarkedMajors(savedMajorsIds);

  return (
    <div className="max-w-6xl mx-auto">
      <SavedMajorsHeader count={savedMajorsIds.length} />

      {savedMajors.length > 0 ? (
        <SavedMajorsContent
          savedMajors={savedMajors}
          savedMajorsIds={savedMajorsIds}
          isUserAuthenticated={user ? true : false}
        />
      ) : (
        <EmptySavedState />
      )}
    </div>
  );
}
