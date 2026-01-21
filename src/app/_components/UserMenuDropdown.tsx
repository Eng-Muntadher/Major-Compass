import { motion } from "framer-motion";
import { User, LogOut } from "lucide-react";
import { dropdownMenu } from "../_styles/animations";

interface UserMenuDropdownProps {
  userName: string;
  onProfileClick: () => void;
  onSignOut: () => void;
}
export function UserMenuDropdown({
  userName,
  onProfileClick,
  onSignOut,
}: UserMenuDropdownProps) {
  return (
    <motion.div
      {...dropdownMenu}
      className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-20"
    >
      <div className="px-4 py-2 border-b border-gray-100">
        <p className="text-sm text-gray-500">Signed In As</p>
        <p className="truncate">{userName}</p>
      </div>
      <button
        onClick={onProfileClick}
        className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-2"
      >
        <User className="w-4 h-4" />
        Profile
      </button>
      <button
        onClick={onSignOut}
        className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 text-red-600"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>
    </motion.div>
  );
}
