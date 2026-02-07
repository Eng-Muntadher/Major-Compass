import { motion } from "framer-motion";
import { User, LogOut, LogIn } from "lucide-react";
import { dropdownMenu } from "../_styles/animations";
import Link from "next/link";
import { signOut } from "@/app/actions/emailAuth";

interface UserMenuDropdownProps {
  userName: string | null;
  onNavigate: () => void;
  lang: "en" | "ar";
}

/* This component manages it's own translation since I do not want prop drilling for translation
 and I cannot import a file for translation for performance optimization */
const translations = {
  en: {
    signedInAs: "Signed in as",
    profile: "Profile",
    signOut: "Sign Out",
    notSignedIn: "You are not signed in",
    signIn: "Sign In",
    createAccount: "Create Account",
  },
  ar: {
    signedInAs: "مسجل الدخول باسم",
    profile: "الملف الشخصي",
    signOut: "تسجيل الخروج",
    notSignedIn: "أنت غير مسجل الدخول",
    signIn: "تسجيل الدخول",
    createAccount: "إنشاء حساب",
  },
};

export function UserMenuDropdown({
  userName,
  onNavigate,
  lang,
}: UserMenuDropdownProps) {
  const isSignedIn = Boolean(userName);
  const t = translations[lang];
  const isArabic = lang === "ar";

  return (
    <motion.div
      {...dropdownMenu}
      dir={isArabic ? "rtl" : "ltr"}
      className={`
        absolute mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-20
        ${isArabic ? "left-0 text-right" : "right-0 text-left"}
      `}
    >
      {/* SIGNED IN */}
      {isSignedIn && (
        <>
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm text-gray-500">{t.signedInAs}</p>
            <p className="truncate font-medium">{userName}</p>
          </div>

          <Link
            href="/profile"
            onClick={onNavigate}
            className={`w-full px-4 py-2 hover:bg-gray-50 transition-colors flex items-center gap-2 ${
              isArabic ? "flex-row-reverse" : ""
            }`}
          >
            <User className="w-4 h-4" aria-hidden="true" />
            {t.profile}
          </Link>

          <button
            onClick={() => {
              onNavigate();
              signOut();
            }}
            className={`w-full px-4 py-2 hover:bg-gray-50 transition-colors flex items-center gap-2 text-red-600 cursor-pointer ${
              isArabic ? "flex-row-reverse" : ""
            }`}
          >
            <LogOut className="w-4 h-4" aria-hidden="true" />
            {t.signOut}
          </button>
        </>
      )}

      {/* NOT SIGNED IN */}
      {!isSignedIn && (
        <>
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm text-gray-500">{t.notSignedIn}</p>
          </div>

          <Link
            href="/sign-in"
            onClick={onNavigate}
            className={`w-full px-4 py-2 hover:bg-gray-50 transition-colors flex items-center gap-2 ${
              isArabic ? "flex-row-reverse" : ""
            }`}
          >
            <LogIn className="w-4 h-4" aria-hidden="true" />
            {t.signIn}
          </Link>

          <Link
            href="/sign-up"
            onClick={onNavigate}
            className={`w-full px-4 py-2 hover:bg-gray-50 transition-colors flex items-center gap-2 ${
              isArabic ? "flex-row-reverse" : ""
            }`}
          >
            <User className="w-4 h-4" aria-hidden="true" />
            {t.createAccount}
          </Link>
        </>
      )}
    </motion.div>
  );
}
