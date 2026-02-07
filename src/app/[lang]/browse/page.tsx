import { SortDropdown, SortOption } from "@/app/_components/SortDropdown";
import { MajorCard } from "@/app/_components/MajorCard";
import { filterMajorsByCategory } from "@/app/_utils/search";
import { sortMajors } from "@/app/_utils/sort";
import { createClient } from "@/app/_lib/supabase";
import { Major } from "@/app/_lib/types";
import { getMajors } from "@/app/_lib/supabaseHelpers";
import MajorsAnimatedGrid from "@/app/_components/MajorsAnimatedGrid";
import MajorAnimatedItem from "@/app/_components/MajorAnimatedItem";

export const revalidate = 60;

export const metadata = {
  title: "Browse Majors | Major Compass",
};

interface PageProps {
  searchParams: Promise<{
    category?: string;
    sortOrder?: SortOption;
  }>;
  params: Promise<{ lang: "en" | "ar" }>;
}

export default async function BrowsePage({ searchParams, params }: PageProps) {
  const { lang } = await params;

  const { category, sortOrder } = await searchParams;

  const supabase = await createClient();
  const majors = await getMajors(supabase, lang);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get user's profile data
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("bookmarks")
    .eq("id", user?.id)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
  }

  // Get filtered and sorted majors
  const getFilteredMajors = () => {
    let filtered: Partial<Major>[] | null = majors;
    filtered = filterMajorsByCategory(filtered, category || "all");
    return sortMajors(filtered, sortOrder || "default");
  };

  const filteredMajors = getFilteredMajors();

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
            ? `${filteredMajors?.length} major${filteredMajors?.length !== 1 ? "s" : ""} found`
            : `${filteredMajors?.length} تخصص${filteredMajors?.length !== 1 ? "ات" : ""} تم العثور عليها`}
        </p>
      </header>

      {/* Sorting controls */}
      <SortDropdown />

      {/* Results list */}
      <MajorsAnimatedGrid>
        {filteredMajors?.map((major, i) => (
          <MajorAnimatedItem key={major.id}>
            <MajorCard
              index={i}
              major={major}
              isSaved={profile?.bookmarks.includes(major.id) || false}
              isUserAuthenticated={user ? true : false}
            />
          </MajorAnimatedItem>
        ))}
      </MajorsAnimatedGrid>
    </section>
  );
}
