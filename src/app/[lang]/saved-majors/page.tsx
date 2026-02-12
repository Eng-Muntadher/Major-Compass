import { redirect } from "next/navigation";
import { createClient } from "@/app/_lib/supabase";
import { getTranslations } from "@/app/translations";
import { getLocaleFromParams } from "@/app/_utils/lang";
import { getMajors } from "@/app/_lib/supabaseHelpers";
import SavedMajorsHeader from "@/app/_components/SavedMajorsHeader";
import SavedMajorsContent from "@/app/_components/SavedMajorsContent";
import EmptySavedState from "@/app/_components/EmptySavedState";
import { Pagination } from "@/app/_components/Pagination";

export const metadata = {
  title: "Saved Majors | Major Compass",
};

const ITEMS_PER_PAGE = 9;

interface PageProps {
  params: Promise<{ lang: "en" | "ar" }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function SavedMajors({ params, searchParams }: PageProps) {
  // Get the current language and page from the params
  const { lang } = await params;
  const { page } = await searchParams;

  // Parse and validate page number
  const currentPage = Math.max(1, parseInt(page || "1", 10));

  // Validate types and get the translation for this page (Arabic / English)
  const locale = getLocaleFromParams(lang);
  const t = getTranslations(locale).savedMajors;

  const supabase = await createClient();

  // Fetch the current user data
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // This route is protected, so the user must be authenticated to access it
  // Upon redirecting, we also pass a query param to show a toast message on the sign in page about why they were redirected
  if (!user) {
    redirect(
      `/sign-in?error=saved-majors-access-denied&redirect=/saved-majors`,
    );
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

  // An array of id's for the saved majors by the current user
  const savedMajorsIds = profile?.bookmarks || [];

  // Fetch saved majors based on the id's input array
  const allSavedMajors =
    (await getMajors(supabase, lang, savedMajorsIds)) || [];

  const totalCount = allSavedMajors.length;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // Clamp currentPage to valid range
  const validatedPage = Math.min(Math.max(1, currentPage), totalPages || 1);

  // Paginate results
  const startIndex = (validatedPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedSavedMajors = allSavedMajors.slice(startIndex, endIndex);

  return (
    <div className="max-w-6xl mx-auto">
      <SavedMajorsHeader header={t.header} count={savedMajorsIds.length} />

      {allSavedMajors.length > 0 ? (
        <>
          <SavedMajorsContent
            stats={t.stats}
            compareCTA={t.compareCTA}
            savedMajors={paginatedSavedMajors}
            savedMajorsIds={savedMajorsIds}
            lang={lang}
            isUserAuthenticated={user ? true : false}
          />

          {/* Pagination controls */}
          {totalPages > 1 && (
            <Pagination
              currentPage={validatedPage}
              totalPages={totalPages}
              lang={lang}
            />
          )}
        </>
      ) : (
        <EmptySavedState emptyState={t.emptyState} lang={lang} />
      )}
    </div>
  );
}
