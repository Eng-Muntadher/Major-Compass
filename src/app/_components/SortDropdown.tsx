"use client";

import { ArrowUpDown } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

export type SortOption =
  | "default"
  | "difficulty-asc"
  | "difficulty-desc"
  | "gpa-asc"
  | "gpa-desc"
  | "name-asc"
  | "name-desc";

export function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sortOrder") ?? "default";

  const onChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "default") {
      params.delete("sortOrder");
    } else {
      params.set("sortOrder", value);
    }

    router.push(`/browse?${params.toString()}`);
  };
  return (
    <div className="flex items-center gap-2 mb-6">
      {/* Decorative icon */}
      <ArrowUpDown className="w-4 h-4 text-gray-500" aria-hidden="true" />

      {/* Accessible label */}
      <label htmlFor="sort-majors" className="sr-only">
        Sort majors
      </label>

      <select
        id="sort-majors"
        value={currentSort}
        onChange={(e) => onChange(e.target.value)}
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
