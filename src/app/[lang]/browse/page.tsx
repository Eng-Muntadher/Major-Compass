import { SortDropdown, SortOption } from "@/app/_components/SortDropdown";
import { MajorCard } from "@/app/_components/MajorCard";
import { filterMajorsByCategory } from "@/app/_utils/search";
import { sortMajors } from "@/app/_utils/sort";
import { createClient } from "@/app/_lib/supabase";
import { Major } from "@/app/_lib/types";
import { getMajors } from "@/app/_lib/supabaseHelpers";
import { Pagination } from "@/app/_components/Pagination";
import MajorsAnimatedGrid from "@/app/_components/MajorsAnimatedGrid";
import MajorAnimatedItem from "@/app/_components/MajorAnimatedItem";

// Tap Title
export const metadata = {
  title: "Browse Majors | Major Compass",
};

const ITEMS_PER_PAGE = 12;

interface PageProps {
  searchParams: Promise<{
    category?: string;
    sortOrder?: SortOption;
    page?: string;
  }>;
  params: Promise<{ lang: "en" | "ar" }>;
}

export default async function BrowsePage({ searchParams, params }: PageProps) {
  // Get the current language and browse options from the URL
  const { lang } = await params;
  const { category, sortOrder, page } = await searchParams;

  // Parse and validate page number
  const currentPage = Math.max(1, parseInt(page || "1", 10));

  const supabase = await createClient();

  // Fetch majors data (language responsive)
  const majors = await getMajors(supabase, lang);

  // Get the current authenticated user (if there is one)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("bookmarks")
    .eq("id", user?.id)
    .single();

  // Harmless error, does not stop the rest of the code if the user is not signed in
  if (error) {
    console.error("Error fetching profile:", error);
  }

  // Get filtered and sorted majors
  const getFilteredMajors = () => {
    let filtered: Partial<Major>[] | null = majors;
    filtered = filterMajorsByCategory(filtered, category || "all");
    return sortMajors(filtered, sortOrder || "default");
  };

  const allFilteredMajors = getFilteredMajors();
  const totalCount = allFilteredMajors?.length || 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // Paginate results
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedMajors = allFilteredMajors?.slice(startIndex, endIndex);

  return (
    <section aria-labelledby="all-categories-heading" className="bg-gray-50">
      {/* Section header */}
      <header className="mb-8">
        <h2 id="all-categories-heading" className="text-3xl font-bold mb-2">
          {category
            ? category.charAt(0).toUpperCase() + category.slice(1)
            : "All Categories"}
        </h2>

        <p className="text-gray-600" aria-live="polite">
          {lang === "en"
            ? `${totalCount} major${totalCount !== 1 ? "s" : ""} found`
            : `${totalCount} تخصص${totalCount !== 1 ? "ات" : ""} تم العثور عليها`}
        </p>
      </header>

      {/* Sorting controls */}
      <SortDropdown />

      {/* Results list */}
      <MajorsAnimatedGrid>
        {paginatedMajors?.map((major, i) => (
          <MajorAnimatedItem key={major.id}>
            <MajorCard
              index={i}
              major={major}
              lang={lang}
              isSaved={profile?.bookmarks.includes(major.id) || false}
              isUserAuthenticated={user ? true : false}
            />
          </MajorAnimatedItem>
        ))}
      </MajorsAnimatedGrid>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          lang={lang}
        />
      )}
    </section>
  );
}
