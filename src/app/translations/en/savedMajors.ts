const savedMajors = {
  header: {
    title: "Saved Majors",

    countLabel: {
      one: "major saved",
      other: "majors saved",
    },

    description: "Your personal collection of majors you're interested in",
  },

  stats: {
    total: "Total Saved",
    categories: "Categories",
    AvgYears: "Avg. Years",
  },

  compareCTA: {
    title: "Ready to Compare Your Options?",
    description: "Use AI to analyze and compare your saved majors",
    buttonLabel: "Compare with AI",
    buttonAria: "Compare saved majors with AI",
  },

  emptyState: {
    title: "No saved majors yet",
    description:
      "Start exploring majors and save the ones that interest you. Click the bookmark icon on any major card to add it here.",
    actions: {
      browse: "Browse Majors",
      tips: "Get Tips & Advice",
    },
  },
};

export type SavedMajorsTranslationTypes = typeof savedMajors;

export default savedMajors;
