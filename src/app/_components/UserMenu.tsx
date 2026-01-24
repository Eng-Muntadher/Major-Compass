import { User } from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { UserMenuDropdown } from "./UserMenuDropdown";

export function UserMenu() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
        aria-label="User menu"
      >
        <User className="w-5 h-5" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {showMenu && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowMenu(false)}
            />
            <UserMenuDropdown userName="guest123" />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
