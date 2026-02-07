const footer = {
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
      { key: "home", label: "الرئيسية" },
      { key: "majors", label: "جميع التخصصات" },
      { key: "tips", label: "نصائح وإرشادات" },
      { key: "compare", label: "مقارنة التخصصات" },
      { key: "about", label: "حول المنصة" },
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
        href: "https://linkedin.com",
        ariaLabel: "لينكدإن",
      },
      {
        label: "GitHub",
        iconKey: "github",
        href: "https://github.com",
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
} as const;

export default footer;
