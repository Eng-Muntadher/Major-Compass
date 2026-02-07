import { motion } from "framer-motion";
import { dropdownMenu } from "../_styles/animations";
import Link from "next/link";
import { EnglishSearchMajors } from "../_lib/types";

interface SearchDropdownProps {
  majors: EnglishSearchMajors[] | null | undefined;
  onMajorClick: (majorId: string) => void;
  lang: "en" | "ar";
}

export function SearchDropdown({
  majors,
  onMajorClick,
  lang,
}: SearchDropdownProps) {
  const hasResults = majors ? majors.length > 0 : null;

  return (
    <motion.div
      {...dropdownMenu}
      className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-10 max-h-96 overflow-y-auto overscroll-contain"
    >
      {hasResults ? (
        <>
          {majors?.map((major) => (
            <Link
              href={`/browse/${major.id}`}
              key={major.id}
              onClick={() => onMajorClick(major.id)}
              className="w-full block px-4 py-3 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">
                    {lang === "en" ? major.nameEn : major.nameAr}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {lang === "en" ? major.categoryEn : major.categoryAr}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </>
      ) : (
        <div className="px-4 py-8 text-center text-gray-500">
          <div className="text-4xl mb-2">🔍</div>
          <p className="text-sm">No results found </p>
          <p className="text-xs mt-1">Try a different search term</p>
        </div>
      )}
    </motion.div>
  );
}
