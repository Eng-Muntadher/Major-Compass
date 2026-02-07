import { Search } from "lucide-react";
import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { filterMajorsBySearch } from "../_utils/search";
import { useClickOutside } from "../_hooks/useClickOutside";
import { SearchDropdown } from "./SearchDropdown";
import { EnglishSearchMajors } from "../_lib/types";

interface SearchBarProps {
  className?: string;
  autoFocus?: boolean;
  searchMajors: EnglishSearchMajors[] | null;
  lang: "en" | "ar";
}

export function SearchBar({
  className = "",
  autoFocus = false,
  searchMajors,
  lang,
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredMajors = filterMajorsBySearch(searchMajors, searchQuery)?.slice(
    0,
    8,
  );

  useClickOutside(
    [dropdownRef, inputRef],
    () => setShowDropdown(false),
    showDropdown,
  );

  const handleMajorClick = () => {
    setSearchQuery("");
    setShowDropdown(false);
  };

  const placeholder =
    lang === "ar"
      ? "ابحث عن التخصصات (مثال: علوم الحاسوب، الطب)..."
      : "Search majors (e.g., Computer Science, Medicine)...";

  return (
    <div className={className}>
      <div className="flex justify-center relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          name="search"
          id="search"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          autoFocus={autoFocus}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        />
        <AnimatePresence>
          {showDropdown && searchQuery.trim() && (
            <div ref={dropdownRef}>
              <SearchDropdown
                lang={lang}
                majors={filteredMajors}
                onMajorClick={handleMajorClick}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
