export interface MajorCategory {
  id: string;
  nameEn: string;
  nameAr: string;
  icon: string;
  link: string;
}

export const categories: MajorCategory[] = [
  {
    id: "all",
    nameEn: "All Majors",
    nameAr: "جميع التخصصات",
    icon: "📚",
    link: "/browse",
  },
  {
    id: "engineering",
    nameEn: "Engineering",
    nameAr: "الهندسة",
    icon: "⚙️",
    link: "/browse?category=engineering",
  },
  {
    id: "medicine",
    nameEn: "Medicine & Health",
    nameAr: "الطب والصحة",
    icon: "🏥",
    link: "/browse?category=medicine",
  },
  {
    id: "science",
    nameEn: "Science",
    nameAr: "العلوم",
    icon: "🔬",
    link: "/browse?category=science",
  },
  {
    id: "business",
    nameEn: "Business & Economics",
    nameAr: "الأعمال والاقتصاد",
    icon: "💼",
    link: "/browse?category=business",
  },
  {
    id: "arts",
    nameEn: "Arts & Humanities",
    nameAr: "الفنون والعلوم الإنسانية",
    icon: "🎨",
    link: "/browse?category=arts",
  },
  {
    id: "IT",
    nameEn: "IT & Computer Science",
    nameAr: "تكنولوجيا المعلومات",
    icon: "💻",
    link: "/browse?category=IT",
  },
  {
    id: "law",
    nameEn: "Law & Political Science",
    nameAr: "القانون والعلوم السياسية",
    icon: "⚖️",
    link: "/browse?category=law",
  },
  {
    id: "education",
    nameEn: "Education",
    nameAr: "التربية",
    icon: "👨‍🏫",
    link: "/browse?category=education",
  },
];
