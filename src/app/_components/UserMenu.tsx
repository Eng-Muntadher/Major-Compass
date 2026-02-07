import { User } from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { UserMenuDropdown } from "./UserMenuDropdown";
import { usePathname } from "next/navigation";

interface UserMenuProps {
  userName: string | null;
  lang: "en" | "ar";
}

export function UserMenu({ userName, lang }: UserMenuProps) {
  const [showMenu, setShowMenu] = useState(false);

  const pathname = usePathname();

  const fullHref = `/${lang}/profile`;
  const isActive = pathname === fullHref;

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={`p-2 rounded-lg transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent outline-none ${
          isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
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
              lang={lang}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
