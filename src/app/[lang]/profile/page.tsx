import { redirect } from "next/navigation";
import { createClient } from "@/app/_lib/supabase";
import { getLocaleFromParams } from "@/app/_utils/lang";
import { getTranslations } from "@/app/translations";
import ProfileHeader from "@/app/_components/ProfileHeader";
import SavedMajorsSection from "@/app/_components/SavedMajorsSection";
import RecentlyViewedSection from "@/app/_components/RecentlyViewedSection";
import {
  getRecentlySavedMajors,
  getRecentlyViwedMajors,
} from "@/app/_lib/supabaseHelpers";

// Tap title
export const metadata = {
  title: "Your Profile | Major Compass",
};

export default async function UserProfile({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  // Get the current language from the params
  const { lang } = await params;

  // Validate types and get the translation for this page (Arabic / English)
  const locale = getLocaleFromParams(lang);
  const t = getTranslations(locale).profile;

  const supabase = await createClient();

  // Get the current signed in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // This is a protected route so user should be signed in upon access, but this is for extra safety
  if (!user) {
    redirect("/sign-in");
  }

  // Get user's profile data
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const recentlySavedMajors = await getRecentlySavedMajors(
    supabase,
    profile?.bookmarks,
  );

  const recentlyViewdMajors = await getRecentlyViwedMajors(
    supabase,
    profile?.recently_viewed,
  );

  // Error handling
  if (error || !profile) {
    console.error("Error fetching profile:", error);
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">{t.errors.notFound}</h1>
        <p>{t.errors.contactSupport}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <ProfileHeader
        translations={t}
        username={profile?.username}
        email={profile?.email}
        bookmarksCount={profile?.bookmarks.length}
        grade={profile?.grade || "Set up your grade"}
        avatarUrl={profile?.avatar_url}
      />

      <SavedMajorsSection
        translations={t.sections.savedMajors}
        savedMajors={recentlySavedMajors}
      />
      <RecentlyViewedSection
        translations={t.sections.recentlyViewed}
        lang={lang}
        recentlyViewedMajors={recentlyViewdMajors}
      />
    </div>
  );
}
