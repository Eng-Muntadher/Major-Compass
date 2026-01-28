import type { SortOption } from "../_components/SortDropdown";
import { Major } from "../_data/majors";
import { MajorEN } from "../_lib/types";

export function filterMajorsByCategory(
  majors: Major[],
  categoryId: string,
): Major[] {
  if (categoryId === "all") {
    return majors;
  }
  return majors.filter((major) => major.category === categoryId);
}

const difficultyOrder: { [key: string]: number } = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
  "Very Hard": 4,
};

export function sortMajors(
  majors: MajorEN[] | null,
  sortOption: SortOption,
): MajorEN[] | null {
  const sorted = majors ? [...majors] : null;

  if (sorted === null) return null;

  switch (sortOption) {
    case "name-asc":
      return sorted.sort((a, b) => a.nameEn.localeCompare(b.nameEn));

    case "name-desc":
      return sorted.sort((a, b) => b.nameEn.localeCompare(a.nameEn));

    case "difficulty-asc":
      return sorted.sort(
        (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty],
      );

    case "difficulty-desc":
      return sorted.sort(
        (a, b) => difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty],
      );

    case "gpa-asc":
      return sorted.sort((a, b) => a.minGPA - b.minGPA);

    case "gpa-desc":
      return sorted.sort((a, b) => b.minGPA - a.minGPA);

    case "default":
    default:
      return sorted;
  }
}
