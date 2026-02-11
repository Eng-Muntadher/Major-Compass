import { EnglishSearchMajors, Major } from "../_lib/types";

/**
 * Filter majors by search query
 * Searches across name (English/Arabic), description, and category
 */
export function filterMajorsBySearch(
  majors: EnglishSearchMajors[] | null,
  query: string,
): EnglishSearchMajors[] | null {
  if (!query.trim()) {
    return majors;
  }

  const lowerQuery = query.toLowerCase();

  return majors
    ? majors?.filter((major) => {
        return (
          major.nameEn.toLowerCase().includes(lowerQuery) ||
          major.categoryEn.toLowerCase().includes(lowerQuery) ||
          major.categoryAr.toLowerCase().includes(lowerQuery) ||
          major.nameAr.toLowerCase().includes(lowerQuery)
        );
      })
    : null;
}

// Filter majors by category
export function filterMajorsByCategory(
  majors: Partial<Major>[] | null,
  categoryId: string,
): Partial<Major>[] | null {
  if (categoryId === "all") {
    return majors;
  }
  return majors
    ? majors.filter(
        (major) => major?.category?.toLowerCase() === categoryId.toLowerCase(),
      )
    : null;
}
