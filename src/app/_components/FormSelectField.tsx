import { LucideIcon } from "lucide-react";

interface FormSelectFieldProps {
  id: string;
  label: string;
  value?: string;
  name: string;
  onChange?: (value: string) => void;
  options: string[];
  icon: LucideIcon;
  required?: boolean;
}

export default function FormSelectField({
  id,
  label,
  value,
  name,
  onChange,
  options,
  icon: Icon,
  required = false,
}: FormSelectFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm mb-2 text-gray-700 font-medium"
      >
        {label}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      <div className="relative">
        <div
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          aria-hidden="true"
        >
          <Icon className="w-5 h-5" aria-hidden="true" />
        </div>
        <select
          id={id}
          value={value}
          name={name}
          onChange={(e) => (onChange ? onChange(e.target.value) : () => {})}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none appearance-none bg-white cursor-pointer"
          required={required}
          aria-required={required}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
