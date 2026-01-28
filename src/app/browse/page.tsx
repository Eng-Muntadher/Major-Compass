import { SortDropdown, SortOption } from "../_components/SortDropdown";
import { MajorCard } from "../_components/MajorCard";
import { filterMajorsByCategory } from "../_utils/search";
import { sortMajors } from "../_utils/SortAndFilter";
import MajorsAnimatedGrid from "../_components/MajorsAnimatedGrid";
import MajorAnimatedItem from "../_components/MajorAnimatedItem";
import { createClient } from "../_lib/supabase";
import { getMajorsInEnglish } from "../_lib/supabaseHelpers";
import { MajorEN } from "../_lib/types";

export const revalidate = 60;

interface PageProps {
  searchParams: Promise<{
    category?: string;
    sortOrder?: SortOption;
  }>;
}

export default async function BrowsePage({ searchParams }: PageProps) {
  const { category, sortOrder } = await searchParams;

  const supabase = await createClient();
  const majors = await getMajorsInEnglish(supabase);

  // Get filtered and sorted majors
  const getFilteredMajors = () => {
    let filtered: MajorEN[] | null = majors;
    filtered = filterMajorsByCategory(filtered, category || "all");
    return sortMajors(filtered, sortOrder || "default");
  };

  const filteredMajors = getFilteredMajors();

  return (
    <section
      aria-labelledby="all-categories-heading"
      className="min-h-screen bg-gray-50 p-8"
    >
      {/* Section header */}
      <header className="mb-8">
        <h2 id="all-categories-heading" className="text-3xl font-bold mb-2">
          All Categories
        </h2>

        <p className="text-gray-600" aria-live="polite">
          {filteredMajors?.length} major
          {filteredMajors?.length !== 1 ? "s" : ""} found
        </p>
      </header>

      {/* Sorting controls */}
      <SortDropdown />

      {/* Results list */}
      <MajorsAnimatedGrid>
        {filteredMajors?.map((major) => (
          <MajorAnimatedItem key={major.id}>
            <MajorCard major={major} />
          </MajorAnimatedItem>
        ))}
      </MajorsAnimatedGrid>
    </section>
  );
}
