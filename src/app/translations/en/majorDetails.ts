const majorDetailsTranslations = {
  // Navigation
  navigation: {
    backToMajors: "Back to majors",
  },

  // Not found
  notFound: {
    message: "Major not found",
  },

  // Quick Stats Component
  quickStats: {
    heading: "Quick Statistics",
    minGPA: {
      label: "Min GPA",
      ariaLabel: "Minimum GPA Required",
    },
    duration: {
      label: "Duration",
      ariaLabel: "Program Duration",
    },
    jobs: {
      label: "Jobs",
      ariaLabel: "Number of Career Opportunities",
      suffix: "+",
    },
    difficulty: {
      label: "Difficulty",
      ariaLabel: "Program Difficulty Level",
      levels: {
        Easy: "Easy",
        Medium: "Medium",
        Hard: "Hard",
        "Very Hard": "Very Hard",
      },
    },
  },

  // AI Analyze Button Component
  aiAnalyze: {
    buttonText: "Analyze This Major with AI",
    description:
      "Get personalized recommendations and see if you're a good fit",
    analyzePrompt: "Analyze the major of", // Will be followed by major name
  },

  // GPA Notice Component
  gpaNotice: {
    title: "Note:",
    message:
      "The GPA displayed is calculated based on the standards of the University of Baghdad. Requirements may vary by university.",
  },

  // Demand Banners Component
  demandBanners: {
    heading: "Market Demand",
    insideIraq: {
      label: "Demand Inside Iraq",
      ariaLabel: "Demand inside Iraq",
    },
    outsideIraq: {
      label: "Demand Outside Iraq",
      ariaLabel: "Demand outside Iraq",
    },
    levels: {
      High: "High",
      Medium: "Medium",
      Low: "Low",
    },
  },

  // Description Component
  description: {
    heading: "About This Major",
  },

  // Skills Section Component
  skills: {
    heading: "Required Skills",
  },

  // Subjects Section Component
  subjects: {
    heading: "Main Subjects You'll Study",
  },

  // Pros and Cons Component
  prosAndCons: {
    pros: {
      heading: "Advantages",
    },
    cons: {
      heading: "Challenges",
    },
  },

  // Career Section Component
  career: {
    heading: "Career Opportunities",
    averageSalary: "Average Salary:",
  },

  // Universities Section Component
  universities: {
    heading: "Top Universities in Iraq",
    rankLabel: "Rank",
  },

  // Common Mistakes Component
  commonMistakes: {
    heading: "Common Mistakes Students in This Major Make",
  },

  // Similar Majors Component
  similarMajors: {
    heading: "Similar Majors You Might Like",
    minGPA: "Min GPA:",
  },
};

export type MajorDetailsType = typeof majorDetailsTranslations;

export default majorDetailsTranslations;
