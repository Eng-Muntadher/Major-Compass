import { motion } from "framer-motion";
import { Major } from "../_data/majors";
import { dropdownMenu } from "../_styles/animations";

interface SearchDropdownProps {
  majors: Major[];
  onMajorClick: (majorId: string) => void;
}

export function SearchDropdown({ majors, onMajorClick }: SearchDropdownProps) {
  const hasResults = majors.length > 0;

  return (
    <motion.div
      {...dropdownMenu}
      className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-10 max-h-96 overflow-y-auto"
    >
      {hasResults ? (
        <>
          {majors.map((major) => (
            <button
              key={major.id}
              type="button"
              onClick={() => onMajorClick(major.id)}
              className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">
                    {major.name}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {major.category}
                  </div>
                </div>
              </div>
            </button>
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
