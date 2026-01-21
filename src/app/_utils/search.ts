import { Major } from "../_data/majors";

/**
 * Filter majors by search query
 * Searches across name (English/Arabic), description, and category
 */
export function filterMajorsBySearch(majors: Major[], query: string): Major[] {
  if (!query.trim()) {
    return majors;
  }

  const lowerQuery = query.toLowerCase();

  return majors.filter((major) => {
    return (
      major.name.toLowerCase().includes(lowerQuery) ||
      major.nameArabic.includes(query) ||
      major.description.toLowerCase().includes(lowerQuery) ||
      major.category.toLowerCase().includes(lowerQuery)
    );
  });
}

/**
 * Filter majors by category
 */
export function filterMajorsByCategory(
  majors: Major[],
  categoryId: string,
): Major[] {
  if (categoryId === "all") {
    return majors;
  }
  return majors.filter((major) => major.category === categoryId);
}
