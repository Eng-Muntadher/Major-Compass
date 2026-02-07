import { BookmarkIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SavedMajorsButtonProps {
  currentLanguage: "en" | "ar";
}

export function SavedMajorsButton({ currentLanguage }: SavedMajorsButtonProps) {
  const pathname = usePathname();

  const fullHref = `/${currentLanguage}/saved-majors`;
  const isActive = pathname === fullHref;

  return (
    <Link
      href={fullHref}
      className={`relative p-2 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent outline-none ${
        isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
      }`}
      aria-label="Saved majors"
    >
      <BookmarkIcon className="w-5 h-5" aria-hidden="true" />
    </Link>
  );
}
