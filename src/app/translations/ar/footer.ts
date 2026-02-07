import { FooterTranslationTypes } from "../en/footer";

const footer: FooterTranslationTypes = {
  tagline: "نساعد الطلبة العراقيين على اختيار التخصص المناسب",

  about: {
    title: "حول المنصة",
    description:
      "مايجر كومباس هو المكان الذي تبدأ فيه القرارات الأكاديمية الصحيحة. نساعد الطلبة على استكشاف مستقبلهم الدراسي بثقة ووعي.",
    developerLabel: "المطور",
    developerName: "منتظر أحمد",
  },

  navigation: {
    title: "التنقل",
    links: [
      { key: "home", label: "الرئيسية", href: "home" },
      { key: "majors", label: "جميع التخصصات", href: "browse" },
      { key: "tips", label: "نصائح وإرشادات", href: "tips-and-advice" },
      { key: "compare", label: "مقارنة التخصصات", href: "compare-majors" },
      { key: "about", label: "حول المنصة", href: "about" },
    ],
  },

  features: {
    title: "المميزات",
    items: [
      "أكثر من 16 تخصصًا جامعيًا",
      "معلومات متكاملة عن متطلبات التخصص",
      "مستشار مهني مدعوم بالذكاء الاصطناعي",
      "حفظ ومقارنة التخصصات",
      "اختبار الطالب الذكي",
    ],
  },

  social: {
    title: "تابعني على",
    links: [
      {
        label: "LinkedIn",
        iconKey: "linkedin",
        href: "https://www.linkedin.com/in/montadar-ahmed-4577b6333",
        ariaLabel: "لينكدإن",
      },
      {
        label: "GitHub",
        iconKey: "github",
        href: "https://github.com/Eng-Muntadher",
        ariaLabel: "جيت هب",
      },
      {
        label: "MT",
        href: "https://muntadher-ahmed.vercel.app",
        ariaLabel: "زيارة موقعي الشخصي",
        className: "text-xl",
      },
    ],
  },

  contact: {
    title: "تواصل معي",
    description: "هل لديك أسئلة أو ملاحظات؟ يسعدني التواصل معك!",
  },

  bottom: {
    copyright: "Major Compass. جميع الحقوق محفوظة.",
    disclaimer:
      "تنبيه: هذا التطبيق لأغراض معلوماتية فقط. يرجى التحقق من متطلبات القبول من الجامعات الرسمية. المطور غير مسؤول عن أي قرارات يتم اتخاذها بناءً على هذه المعلومات.",
  },
};

export default footer;
