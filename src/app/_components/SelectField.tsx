import FormField from "./FormField";

type Option = {
  value: string;
  label: string;
  labelAr: string;
};

type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  error?: string;
  required?: boolean;
  placeholder?: string;
  id?: string;
  isEnglish: boolean;
};

export default function SelectField({
  label,
  value,
  onChange,
  options,
  error,
  required,
  isEnglish,
  placeholder = "Select an option",
  id,
}: SelectFieldProps) {
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
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {isEnglish ? option.label : option.labelAr}
          </option>
        ))}
      </select>
    </FormField>
  );
}
