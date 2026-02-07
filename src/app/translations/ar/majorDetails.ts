import { MajorDetailsType } from "../en/majorDetails";

const majorDetailsTranslations: MajorDetailsType = {
  // Navigation
  navigation: {
    backToMajors: "العودة إلى التخصصات",
  },

  // Not found
  notFound: {
    message: "التخصص غير موجود",
  },

  // Quick Stats Component
  quickStats: {
    heading: "إحصائيات سريعة",
    minGPA: {
      label: "الحد الأدنى للمعدل",
      ariaLabel: "الحد الأدنى للمعدل المطلوب",
    },
    duration: {
      label: "المدة",
      ariaLabel: "مدة البرنامج",
    },
    jobs: {
      label: "الوظائف",
      ariaLabel: "عدد الفرص الوظيفية",
      suffix: "+",
    },
    difficulty: {
      label: "الصعوبة",
      ariaLabel: "مستوى صعوبة البرنامج",
      levels: {
        Easy: "سهل",
        Medium: "متوسط",
        Hard: "صعب",
        "Very Hard": "صعب جداً",
      },
    },
  },

  // AI Analyze Button Component
  aiAnalyze: {
    buttonText: "تحليل هذا التخصص بالذكاء الاصطناعي",
    description: "احصل على توصيات مخصصة واعرف ما إذا كنت مناسباً لهذا التخصص",
    analyzePrompt: "حلل تخصص", // Will be followed by major name
  },

  // GPA Notice Component
  gpaNotice: {
    title: "ملاحظة:",
    message:
      "المعدل المعروض محسوب بناءً على معايير جامعة بغداد. قد تختلف المتطلبات حسب الجامعة.",
  },

  // Demand Banners Component
  demandBanners: {
    heading: "الطلب في سوق العمل",
    insideIraq: {
      label: "الطلب داخل العراق",
      ariaLabel: "الطلب داخل العراق",
    },
    outsideIraq: {
      label: "الطلب خارج العراق",
      ariaLabel: "الطلب خارج العراق",
    },
    levels: {
      High: "عالي",
      Medium: "متوسط",
      Low: "منخفض",
    },
  },

  // Description Component
  description: {
    heading: "عن هذا التخصص",
  },

  // Skills Section Component
  skills: {
    heading: "المهارات المطلوبة",
  },

  // Subjects Section Component
  subjects: {
    heading: "المواد الرئيسية التي ستدرسها",
  },

  // Pros and Cons Component
  prosAndCons: {
    pros: {
      heading: "المميزات",
    },
    cons: {
      heading: "التحديات",
    },
  },

  // Career Section Component
  career: {
    heading: "الفرص الوظيفية",
    averageSalary: "متوسط الراتب:",
  },

  // Universities Section Component
  universities: {
    heading: "أفضل الجامعات في العراق",
    rankLabel: "الترتيب",
  },

  // Common Mistakes Component
  commonMistakes: {
    heading: "الأخطاء الشائعة التي يرتكبها طلاب هذا التخصص",
  },

  // Similar Majors Component
  similarMajors: {
    heading: "تخصصات مشابهة قد تعجبك",
    minGPA: "الحد الأدنى للمعدل:",
  },
};

export default majorDetailsTranslations;
