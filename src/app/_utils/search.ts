import { EnglishSearchMajors, MajorEN } from "../_lib/types";

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
          major.name.toLowerCase().includes(lowerQuery) ||
          major.category.toLowerCase().includes(lowerQuery)
        );
      })
    : null;
}

/**
 * Filter majors by category
 */
export function filterMajorsByCategory(
  majors: MajorEN[] | null,
  categoryId: string,
): MajorEN[] | null {
  if (categoryId === "all") {
    return majors;
  }
  return majors
    ? majors.filter(
        (major) => major.category.toLowerCase() === categoryId.toLowerCase(),
      )
    : null;
}
