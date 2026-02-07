import {
  ArrowLeftRight,
  Bookmark,
  ClipboardList,
  Home,
  Info,
  Lightbulb,
} from "lucide-react";

export const sidebarLinks = [
  {
    labelEn: "Home",
    labelAr: "الرئيسية",
    href: "/home",
    Icon: Home,
  },
  {
    labelEn: "Tips & Advice",
    labelAr: "نصائح وإرشادات",
    href: "/tips-and-advice",
    Icon: Lightbulb,
  },
  {
    labelEn: "Saved Majors",
    labelAr: "التخصصات المحفوظة",
    href: "/saved-majors",
    Icon: Bookmark,
  },
  {
    labelEn: "Compare Majors",
    labelAr: "مقارنة التخصصات",
    href: "/compare-majors",
    Icon: ArrowLeftRight,
  },
  {
    labelEn: "About",
    labelAr: "حول المشروع",
    href: "/about",
    Icon: Info,
  },
  {
    labelEn: "Student Test",
    labelAr: "اختبار الطالب",
    href: "/student-test",
    Icon: ClipboardList,
  },
];
