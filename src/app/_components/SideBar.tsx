"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "../_data/categories";
import { fadeIn } from "../_styles/animations";
import { useSidebar } from "../_context/SideBarContext";
import { usePathname, useSearchParams } from "next/navigation";
import { sidebarLinks } from "../_data/SideBarLinks";

const linksClasses =
  "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer";

interface SidebarProps {
  currentLanguage: "en" | "ar";
}

export function Sidebar({ currentLanguage }: SidebarProps) {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryURL = searchParams.get("category");

  // Texts for i18n
  const texts = {
    navigation: currentLanguage === "en" ? "Navigation" : "التنقل",
    categories: currentLanguage === "en" ? "Categories" : "الفئات",
    footerLine1:
      currentLanguage === "en"
        ? "Made to help Students"
        : "مصنوع لمساعدة الطلاب",
    footerLine2:
      currentLanguage === "en" ? "Your Future Starts Here" : "مستقبلك يبدأ هنا",
  };

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            {...fadeIn}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200
          w-64 shrink-0 z-50 overflow-y-auto
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full overflow-y-auto sidebar-scroll">
          <div className="h-16 lg:h-0" />

          {/* Main Navigation */}
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xs uppercase tracking-wider text-gray-500 mb-3 px-2">
              {texts.navigation}
            </h2>
            <div className="space-y-1">
              {sidebarLinks.map(({ labelEn, labelAr, href, Icon }) => {
                const fullHref = `/${currentLanguage}${href}`;
                const isActive = pathname === fullHref;

                return (
                  <Link
                    key={href}
                    href={fullHref}
                    className={
                      linksClasses +
                      ` ${
                        isActive
                          ? "bg-blue-100 text-blue-600"
                          : "hover:bg-gray-100 text-gray-700"
                      }`
                    }
                  >
                    <Icon className="w-5 h-5" />
                    <span>{currentLanguage === "en" ? labelEn : labelAr}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Categories */}
          <div className="p-4 flex-1">
            <h2 className="text-xs uppercase tracking-wider text-gray-500 mb-3 px-2">
              {texts.categories}
            </h2>

            <div className="space-y-1">
              {categories.map((category) => {
                // Build the full link with current language
                const fullLink = `/${currentLanguage}${category.link}`;

                // Determine active state
                const basePath = `/${currentLanguage}/browse`;

                const isActive =
                  category.id === "all"
                    ? pathname === basePath && !categoryURL
                    : pathname === basePath && categoryURL === category.id;

                return (
                  <Link
                    href={fullLink}
                    key={category.id}
                    className={
                      linksClasses +
                      ` ${
                        isActive
                          ? "bg-blue-100 text-blue-600"
                          : "hover:bg-gray-100 text-gray-700"
                      }`
                    }
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span>
                      {currentLanguage === "en"
                        ? category.nameEn
                        : category.nameAr}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 text-xs text-gray-500">
            <p>{texts.footerLine1}</p>
            <p className="mt-1">{texts.footerLine2}</p>
          </div>
        </div>
      </aside>
    </>
  );
}
