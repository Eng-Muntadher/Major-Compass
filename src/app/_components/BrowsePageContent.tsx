"use client";

import { useSearchParams } from "next/navigation";
import { BookmarkProvider } from "../_context/BookMarkProvider";
import { Major } from "../_lib/types";
import { filterMajorsByCategory } from "../_utils/search";
import { sortMajors } from "../_utils/sort";
import MajorAnimatedItem from "./MajorAnimatedItem";
import ClientSideMajorCardList from "./MajorCardsClientWrapper";
import MajorsAnimatedGrid from "./MajorsAnimatedGrid";
import { Pagination } from "./Pagination";
import { SortDropdown, SortOption } from "./SortDropdown";
import { useMemo } from "react";

const ITEMS_PER_PAGE = 12;

interface BrowsePageContentProps {
  majors: Partial<Major>[];
  lang: "en" | "ar";
}

function BrowsePageContent({ majors, lang }: BrowsePageContentProps) {
  const searchParams = useSearchParams();

  const category = searchParams.get("category") || "all";
  const sortOrder = searchParams.get("sortOrder") || "default";
  const pageParam = searchParams.get("page") || "1";

  const currentPage = Math.max(1, parseInt(pageParam, 10));

  // Memoize filtering & sorting to avoid recalculation on every render
  const allFilteredMajors = useMemo(() => {
    let filtered: Partial<Major>[] | null = majors;
    filtered = filterMajorsByCategory(filtered, category);
    return sortMajors(filtered, sortOrder as SortOption);
  }, [majors, category, sortOrder]);

  const totalCount = allFilteredMajors?.length || 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedMajors = allFilteredMajors?.slice(startIndex, endIndex);

  const animationKey = `${category}-${sortOrder}-${currentPage}`;

  return (
    <section aria-labelledby="all-categories-heading" className="bg-gray-50">
      <header className="mb-8">
        <h2 id="all-categories-heading" className="text-3xl font-bold mb-2">
          {category !== "all"
            ? category.charAt(0).toUpperCase() + category.slice(1)
            : "All Categories"}
        </h2>

        <p className="text-gray-600" aria-live="polite">
          {lang === "en"
            ? `${totalCount} major${totalCount !== 1 ? "s" : ""} found`
            : `${totalCount} تخصص${totalCount !== 1 ? "ات" : ""} تم العثور عليها`}
        </p>
      </header>

      <SortDropdown />

      <BookmarkProvider>
        <MajorsAnimatedGrid key={animationKey}>
          {paginatedMajors?.map((major, i) => (
            <MajorAnimatedItem key={major.id}>
              <ClientSideMajorCardList index={i} major={major} lang={lang} />
            </MajorAnimatedItem>
          ))}
        </MajorsAnimatedGrid>
      </BookmarkProvider>

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

export default BrowsePageContent;
