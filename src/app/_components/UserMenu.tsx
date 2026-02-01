import { User } from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { UserMenuDropdown } from "./UserMenuDropdown";
import { usePathname } from "next/navigation";

export function UserMenu({ userName }: { userName: string | null }) {
  const [showMenu, setShowMenu] = useState(false);

  const pathname = usePathname();

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={`p-2 rounded-lg transition-colors cursor-pointer ${
          pathname === "/profile"
            ? "bg-blue-100 text-blue-600"
            : "hover:bg-gray-100"
        } `}
        aria-label="User menu"
      >
        <User className="w-5 h-5" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {showMenu && (
          <>
            <button
              onClick={() => setShowMenu(false)}
              className="fixed inset-0 z-10"
            />
            <UserMenuDropdown
              onNavigate={() => setShowMenu(false)}
              userName={userName}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
