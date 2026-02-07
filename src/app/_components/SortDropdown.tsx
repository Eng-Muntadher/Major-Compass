"use client";

import { ArrowUpDown } from "lucide-react";
import { useRouter, useParams, useSearchParams } from "next/navigation";

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
  const routeParams = useParams();
  const searchParams = useSearchParams();

  const lang = (routeParams.lang ?? "en") as "en" | "ar";

  // Reactive value
  const currentSort = (searchParams.get("sortOrder") ??
    "default") as SortOption;

  const onChange = (value: SortOption) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "default") {
      params.delete("sortOrder");
    } else {
      params.set("sortOrder", value);
    }

    router.push(`/${lang}/browse?${params.toString()}`);
  };

  const sortLabels: Record<SortOption, string> =
    lang === "en"
      ? {
          default: "Default order",
          "name-asc": "Name (A–Z)",
          "name-desc": "Name (Z–A)",
          "difficulty-asc": "Difficulty (Low to High)",
          "difficulty-desc": "Difficulty (High to Low)",
          "gpa-asc": "GPA (Low to High)",
          "gpa-desc": "GPA (High to Low)",
        }
      : {
          default: "الترتيب الافتراضي",
          "name-asc": "الاسم (أ–ي)",
          "name-desc": "الاسم (ي–أ)",
          "difficulty-asc": "الصعوبة (من الأقل إلى الأعلى)",
          "difficulty-desc": "الصعوبة (من الأعلى إلى الأقل)",
          "gpa-asc": "المعدل (من الأقل إلى الأعلى)",
          "gpa-desc": "المعدل (من الأعلى إلى الأقل)",
        };

  return (
    <div className="flex items-center gap-2 mb-6">
      <ArrowUpDown className="w-4 h-4 text-gray-500" aria-hidden="true" />

      <label htmlFor="sort-majors" className="sr-only">
        {lang === "en" ? "Sort majors" : "ترتيب التخصصات"}
      </label>

      <select
        id="sort-majors"
        value={currentSort}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className={`px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer
          ${lang === "ar" ? "text-right" : "text-left"}`}
      >
        {Object.entries(sortLabels).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
