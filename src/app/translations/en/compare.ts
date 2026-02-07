const compareTranslations = {
  // Page Header
  header: {
    title: "Compare Majors",
    description: "Select two majors to compare side-by-side",
  },

  // Major Selection Panel
  selection: {
    ariaLabel: "Major selection",
    firstMajor: "Select First Major",
    secondMajor: "Select Second Major",
  },

  // Comparison Table
  comparisonTable: {
    srOnlyHeading: "Major Comparison:", // Will be followed by "Major1 vs Major2"
    vs: "vs", // Used between major names
    ariaLabel: "Major comparison details",

    // Row labels
    rows: {
      duration: "Duration",
      minGPA: "Minimum GPA",
      difficulty: "Difficulty Level",
      averageSalary: "Average Salary (USA)",
      demandInIraq: "Demand Inside Iraq",
      demandOutsideIraq: "Demand Outside Iraq",
      jobOpportunities: "Job Opportunities",
      skills: "Required Skills",
    },
  },

  // Empty State
  emptyState: {
    heading: "Select Two Majors to Compare",
    description:
      "Use the dropdowns above to choose majors for detailed comparison",
  },
};

export default compareTranslations;
export type CompareTranslations = typeof compareTranslations;
