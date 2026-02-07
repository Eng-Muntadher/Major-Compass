import FormField from "./FormField";
import RadioGroup from "./RadioGroup";
import RadioGroupItem from "./RadioGroupItem";
import Label from "./Label";

type RadioOption = {
  value: string;
  label: string;
};

type RadioFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  required?: boolean;
};

export default function RadioField({
  label,
  name,
  value,
  onChange,
  options,
  required,
}: RadioFieldProps) {
  return (
    <FormField label={label} required={required}>
      <RadioGroup className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option.value}
              id={`${name}-${option.value}`}
              name={name}
              className="focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <Label
              htmlFor={`${name}-${option.value}`}
              className="font-normal cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </FormField>
  );
}
