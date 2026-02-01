"use client";

import { categories } from "../_data/majors";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "../_styles/animations";
import {
  Home,
  Lightbulb,
  Bookmark,
  ArrowLeftRight,
  Info,
  ClipboardList,
} from "lucide-react";
import Link from "next/link";
import { useSidebar } from "../_context/SideBarContext";
import { usePathname, useSearchParams } from "next/navigation";

const linksClasses =
  "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer";

const sidebarLinks = [
  {
    label: "Home",
    href: "/home",
    Icon: Home,
  },
  {
    label: "Tips & Advice",
    href: "/tips-and-advice",
    Icon: Lightbulb,
  },
  {
    label: "Saved Majors",
    href: "/saved-majors",
    Icon: Bookmark,
  },
  {
    label: "Compare Majors",
    href: "/compare-majors",
    Icon: ArrowLeftRight,
  },
  {
    label: "About",
    href: "/about",
    Icon: Info,
  },
  {
    label: "Student Test",
    href: "/student-test",
    Icon: ClipboardList,
  },
];

export function Sidebar() {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryURL = searchParams.get("category");

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
          {/* Top spacing for mobile (below nav) */}
          <div className="h-16 lg:h-0" />

          {/* Main Navigation */}
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xs uppercase tracking-wider text-gray-500 mb-3 px-2">
              Navigation
            </h2>
            <div className="space-y-1">
              {sidebarLinks.map(({ label, href, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={
                    linksClasses +
                    ` ${pathname === href ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100 text-gray-700"}`
                  }
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="p-4 flex-1">
            <h2 className="text-xs uppercase tracking-wider text-gray-500 mb-3 px-2">
              Categories
            </h2>

            <div className="space-y-1">
              {categories.map((category) => {
                const isActive =
                  category.id === "all"
                    ? pathname === "/browse" && !categoryURL
                    : categoryURL === category.id;

                return (
                  <Link
                    href={category.link}
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
                    <span className="text-sm">{category.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 text-xs text-gray-500">
            <p>Made for Iraqi Students</p>
            <p className="mt-1">Your Future Starts Here</p>
          </div>
        </div>
      </aside>
    </>
  );
}
