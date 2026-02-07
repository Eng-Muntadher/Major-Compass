import { ChevronDown } from "lucide-react";

interface TipSectionHeaderProps {
  tipInfo: {
    title: string;
    icon: string;
  };
  isExpanded: boolean;
  onToggle: () => void;
}

function TipSectionHeader({
  tipInfo,
  isExpanded,
  onToggle,
}: TipSectionHeaderProps) {
  return (
    <button
      onClick={onToggle}
      className="w-full p-6 flex items-center justify-between hover:bg-gray-100 transition-colors cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className="text-4xl">{tipInfo.icon}</div>

        <div className="text-left">
          <h2 className="text-xl mb-1">{tipInfo.title}</h2>
        </div>
      </div>

      <ChevronDown
        className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
          isExpanded ? "rotate-180" : "rotate-0"
        }`}
      />
    </button>
  );
}

export default TipSectionHeader;
