import type { LucideIcon } from "lucide-react";

interface FormInputFieldProps {
  id: string;
  label: string;
  type: "text" | "email" | "password";
  value?: string;
  name: string;
  onChange?: (value: string) => void;
  icon: LucideIcon;
  placeholder?: string;
  required?: boolean;
}

export default function FormInputField({
  id,
  label,
  type,
  value,
  onChange,
  icon: Icon,
  name,
  placeholder,
  required = false,
}: FormInputFieldProps) {
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
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          aria-hidden="true"
        >
          <Icon aria-hidden="true" className="w-5 h-5" />{" "}
        </div>
        <input
          id={id}
          type={type}
          value={value}
          name={name}
          onChange={(e) => (onChange ? onChange(e.target.value) : () => {})}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          placeholder={placeholder}
          required={required}
          aria-required={required}
        />
      </div>
    </div>
  );
}
