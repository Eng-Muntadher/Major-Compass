import { redirect } from "next/navigation";
import { createClient } from "../_lib/supabase";
import { getRecentlySaved, getRecentlyViwed } from "../actions";
import ProfileHeader from "../_components/ProfileHeader";
import SavedMajorsSection from "../_components/SavedMajorsSection";
import RecentlyViewedSection from "../_components/RecentlyViewedSection";

export default async function UserProfile() {
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
    .select("*")
    .eq("id", user.id)
    .single();

  const recentlySavedMajors = await getRecentlySaved(profile?.bookmarks);
  const recentlyViewdMajors = await getRecentlyViwed(profile?.recently_viewed);

  // Error handling
  if (error || !profile) {
    console.error("Error fetching profile:", error);
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
        <p>Please contact support.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <ProfileHeader
        username={profile?.username}
        email={profile?.email}
        bookmarksCount={profile?.bookmarks.length}
        grade={profile?.grade || "Set up your grade"}
        avatarUrl={profile?.avatar_url}
      />

      <SavedMajorsSection savedMajors={recentlySavedMajors} />
      <RecentlyViewedSection recentlyViewedMajors={recentlyViewdMajors} />
    </div>
  );
}
