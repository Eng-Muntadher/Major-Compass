import { motion } from "framer-motion";
import { User, LogOut, LogIn } from "lucide-react";
import { dropdownMenu } from "../_styles/animations";
import Link from "next/link";
import { signOut } from "../actions";

interface UserMenuDropdownProps {
  userName: string | null;
  onNavigate: () => void;
}

export function UserMenuDropdown({
  userName,
  onNavigate,
}: UserMenuDropdownProps) {
  const isSignedIn = Boolean(userName);

  return (
    <motion.div
      {...dropdownMenu}
      className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-20"
    >
      {/* SIGNED IN */}
      {isSignedIn && (
        <>
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm text-gray-500">Signed in as</p>
            <p className="truncate font-medium">{userName}</p>
          </div>

          <Link
            href="/profile"
            onClick={onNavigate}
            className="w-full px-4 py-2 hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <User className="w-4 h-4" aria-hidden="true" />
            Profile
          </Link>

          <button
            onClick={() => {
              onNavigate();
              signOut();
            }}
            className="w-full px-4 py-2 hover:bg-gray-50 transition-colors flex items-center gap-2 text-red-600 cursor-pointer"
          >
            <LogOut className="w-4 h-4" aria-hidden="true" />
            Sign Out
          </button>
        </>
      )}

      {/* NOT SIGNED IN */}
      {!isSignedIn && (
        <>
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm text-gray-500">You are not signed in</p>
          </div>

          <Link
            href="/sign-in"
            onClick={onNavigate}
            className="w-full px-4 py-2 hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" aria-hidden="true" />
            Sign In
          </Link>

          <Link
            href="/sign-up"
            onClick={onNavigate}
            className="w-full px-4 py-2 hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <User className="w-4 h-4" aria-hidden="true" />
            Create Account
          </Link>
        </>
      )}
    </motion.div>
  );
}
