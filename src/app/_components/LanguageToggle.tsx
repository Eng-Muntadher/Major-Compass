import { Globe } from "lucide-react";

interface LanguageToggleProps {
  currentLanguage?: "en" | "ar";
  onToggle?: () => void;
}

export function LanguageToggle({
  currentLanguage = "en",
  onToggle,
}: LanguageToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-1"
      aria-label="Toggle language"
    >
      <Globe className="w-5 h-5" />
      <span className="text-xs hidden sm:inline">
        {currentLanguage === "en" ? "ع" : "EN"}
      </span>
    </button>
  );
}
