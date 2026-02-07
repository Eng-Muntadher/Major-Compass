import { Menu, X } from "lucide-react";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function MobileMenuButton({ isOpen, onToggle }: MobileMenuButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
      aria-label="Toggle menu"
    >
      {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
    </button>
  );
}
