import FormField from "./FormField";
import Checkbox from "./CheckBox";
import Label from "./Label";

type Option = {
  value: string;
  label: string;
};

type CheckboxGroupProps = {
  label: string;
  options: Option[];
  selected: string[];
  onToggle: (value: string) => void;
  error?: string;
  required?: boolean;
};

export default function CheckboxGroup({
  label,
  options,
  selected,
  onToggle,
  error,
  required,
}: CheckboxGroupProps) {
  return (
    <FormField label={label} required={required} error={error}>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={`checkbox-${option.value}`}
              checked={selected.includes(option.value)}
              onChange={() => onToggle(option.value)}
            />
            <Label
              htmlFor={`checkbox-${option.value}`}
              className="font-normal cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </FormField>
  );
}
