import type { SortOption } from "../_components/SortDropdown";
import { Major } from "../_lib/types";

const difficultyOrder: { [key: string]: number } = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
  "Very Hard": 4,
};

export function sortMajors(
  majors: Partial<Major>[] | null,
  sortOption: SortOption,
): Partial<Major>[] | null {
  if (!majors) return null;

  const sorted = [...majors];

  switch (sortOption) {
    case "name-asc":
      return sorted.sort((a, b) =>
        (a.nameEn ?? "").localeCompare(b.nameEn ?? ""),
      );

    case "name-desc":
      return sorted.sort((a, b) =>
        (b.nameEn ?? "").localeCompare(a.nameEn ?? ""),
      );

    case "difficulty-asc":
      return sorted.sort(
        (a, b) =>
          (difficultyOrder[a.difficulty ?? ""] ?? Infinity) -
          (difficultyOrder[b.difficulty ?? ""] ?? Infinity),
      );

    case "difficulty-desc":
      return sorted.sort(
        (a, b) =>
          (difficultyOrder[b.difficulty ?? ""] ?? -Infinity) -
          (difficultyOrder[a.difficulty ?? ""] ?? -Infinity),
      );

    case "gpa-asc":
      return sorted.sort(
        (a, b) => (a.minGPA ?? Infinity) - (b.minGPA ?? Infinity),
      );

    case "gpa-desc":
      return sorted.sort(
        (a, b) => (b.minGPA ?? -Infinity) - (a.minGPA ?? -Infinity),
      );

    case "default":
    default:
      return sorted;
  }
}
