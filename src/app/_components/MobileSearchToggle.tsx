import { Search } from "lucide-react";

interface MobileSearchToggleProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export function MobileSearchToggle({ onToggle }: MobileSearchToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
      aria-label="Search"
    >
      <Search className="w-5 h-5" />
    </button>
  );
}
