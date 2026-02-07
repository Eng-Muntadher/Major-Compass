import { SavedMajorsTranslationTypes } from "../en/savedMajors";

const savedMajors: SavedMajorsTranslationTypes = {
  header: {
    title: "التخصصات المحفوظة",

    countLabel: {
      one: "تخصص محفوظ",
      other: "تخصصات محفوظة",
    },

    description: "مجموعتك الشخصية من التخصصات التي تهتم بها",
  },

  stats: {
    total: "إجمالي المحفوظات",
    categories: "الفئات",
    AvgYears: "متوسط السنوات",
  },

  compareCTA: {
    title: "هل أنت جاهز لمقارنة خياراتك؟",
    description:
      "استخدم الذكاء الاصطناعي لتحليل ومقارنة التخصصات المحفوظة لديك",
    buttonLabel: "قارن باستخدام الذكاء الاصطناعي",
    buttonAria: "قارن التخصصات المحفوظة باستخدام الذكاء الاصطناعي",
  },

  emptyState: {
    title: "لا توجد تخصصات محفوظة بعد",
    description:
      "ابدأ باستكشاف التخصصات واحفظ تلك التي تهمك. اضغط على أيقونة العلامة المرجعية في أي بطاقة تخصص لإضافته هنا.",
    actions: {
      browse: "استعرض التخصصات",
      tips: "احصل على نصائح وإرشادات",
    },
  },
} as const;

export default savedMajors;
