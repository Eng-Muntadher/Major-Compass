import FormField from "./FormField";

type Option = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[] | string[];
  error?: string;
  required?: boolean;
  placeholder?: string;
  id?: string;
};

export default function SelectField({
  label,
  value,
  onChange,
  options,
  error,
  required,
  placeholder = "Select an option",
  id,
}: SelectFieldProps) {
  const normalizedOptions = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt,
  );

  return (
    <FormField label={label} required={required} error={error} htmlFor={id}>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 border rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">{placeholder}</option>
        {normalizedOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  );
}
