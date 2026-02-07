import { redirect } from "next/navigation";
import { createClient } from "@/app/_lib/supabase";
import { getTranslations } from "@/app/translations";
import { getLocaleFromParams } from "@/app/_utils/lang";
import { getMajors } from "@/app/_lib/supabaseHelpers";
import SavedMajorsHeader from "@/app/_components/SavedMajorsHeader";
import SavedMajorsContent from "@/app/_components/SavedMajorsContent";
import EmptySavedState from "@/app/_components/EmptySavedState";

export const metadata = {
  title: "Saved Majors | Major Compass",
};

export default async function SavedMajors({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  const { lang } = await params;

  const locale = getLocaleFromParams(lang);
  const t = getTranslations(locale).savedMajors;

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
  const savedMajors = (await getMajors(supabase, lang, savedMajorsIds)) || [];

  return (
    <div className="max-w-6xl mx-auto">
      <SavedMajorsHeader header={t.header} count={savedMajorsIds.length} />

      {savedMajors.length > 0 ? (
        <SavedMajorsContent
          stats={t.stats}
          compareCTA={t.compareCTA}
          savedMajors={savedMajors}
          savedMajorsIds={savedMajorsIds}
          isUserAuthenticated={user ? true : false}
        />
      ) : (
        <EmptySavedState emptyState={t.emptyState} />
      )}
    </div>
  );
}
