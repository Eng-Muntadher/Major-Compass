import { LucideIcon } from "lucide-react";

interface ProfileInfoCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  isEditing: boolean;
  inputType?: "text" | "email" | "select";
  selectOptions?: { label: string }[];
  onChange?: (value: string) => void;
}

export default function ProfileInfoCard({
  icon: Icon,
  label,
  value,
  isEditing,
  inputType = "text",
  selectOptions,
  onChange,
}: ProfileInfoCardProps) {
  const inputId = `profile-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 overflow-x-auto custom-scroll">
      <div className="flex items-center gap-2 mb-2 opacity-80">
        <span aria-hidden="true">
          <Icon className="w-4 h-4" aria-hidden="true" />
        </span>
        <label htmlFor={isEditing ? inputId : undefined} className="text-sm">
          {label}
        </label>
      </div>

      {isEditing ? (
        inputType === "select" ? (
          <select
            id={inputId}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full bg-white/20 backdrop-blur-sm px-3 py-1 rounded outline-none border-2 border-white/40 focus:border-white cursor-pointer"
            aria-label={label}
          >
            {selectOptions?.map((option) => (
              <option
                key={option.label}
                value={option.label}
                className="text-purple-900"
              >
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={inputId}
            type={inputType}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full bg-white/20 backdrop-blur-sm px-3 py-1 rounded outline-none border-2 border-white/40 focus:border-white"
            placeholder={inputType === "email" ? "your.email@example.com" : ""}
            aria-label={label}
          />
        )
      ) : (
        <p
          className={typeof value === "number" ? "text-2xl font-semibold" : ""}
        >
          {value}
        </p>
      )}
    </div>
  );
}
