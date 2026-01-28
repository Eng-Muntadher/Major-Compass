import { MajorEN } from "../_lib/types";

interface MajorSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  majors: MajorEN[] | null;
  excludeId?: string;
  id: string;
}

export default function MajorSelector({
  label,
  value,
  onChange,
  majors,
  excludeId,
  id,
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
        <option value="">Choose a major...</option>
        {majors?.map((major) => (
          <option
            key={major.id}
            value={major.id}
            disabled={major.id === excludeId}
          >
            {major.nameEn}
          </option>
        ))}
      </select>
    </div>
  );
}
