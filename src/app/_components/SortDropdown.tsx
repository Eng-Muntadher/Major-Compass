import { ArrowUpDown } from "lucide-react";

export type SortOption =
  | "default"
  | "difficulty-asc"
  | "difficulty-desc"
  | "gpa-asc"
  | "gpa-desc"
  | "name-asc"
  | "name-desc";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      {/* Decorative icon */}
      <ArrowUpDown className="w-4 h-4 text-gray-500" aria-hidden="true" />

      {/* Accessible label */}
      <label htmlFor="sort-majors" className="sr-only">
        Sort majors
      </label>

      <select
        id="sort-majors"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      >
        <option value="default">Default order</option>
        <option value="name-asc">Name (A–Z)</option>
        <option value="name-desc">Name (Z–A)</option>
        <option value="difficulty-asc">Difficulty (Low to High)</option>
        <option value="difficulty-desc">Difficulty (High to Low)</option>
        <option value="gpa-asc">GPA (Low to High)</option>
        <option value="gpa-desc">GPA (High to Low)</option>
      </select>
    </div>
  );
}
