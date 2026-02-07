import { Major } from "../_lib/types";

interface MajorSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  majors: Major[] | null;
  excludeId?: string;
  id: string;
  lang: "en" | "ar";
}

export default function MajorSelector({
  label,
  value,
  onChange,
  majors,
  excludeId,
  id,
  lang,
}: MajorSelectorProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm mb-2 font-medium">
        {label}
      </label>

      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border cursor-pointer border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        aria-label={label}
      >
        <option value="">
          {lang === "en" ? "Choose a major..." : "...اختر مجالًا دراسيًا"}
        </option>
        {majors?.map((major) => (
          <option
            key={major.id}
            value={major.id}
            disabled={major.id === excludeId}
          >
            {lang === "en" ? major.nameEn : major.nameAr}
          </option>
        ))}
      </select>
    </div>
  );
}
