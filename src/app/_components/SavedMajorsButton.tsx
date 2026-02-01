import { BookmarkIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SavedMajorsButton() {
  const count = 4;
  const pathname = usePathname();

  return (
    <Link
      href="/saved-majors"
      className={`relative p-2 rounded-lg transition-colors ${
        pathname === "/saved-majors"
          ? "bg-blue-100 text-blue-600"
          : "hover:bg-gray-100"
      }`}
      aria-label="Saved majors"
    >
      <BookmarkIcon className="w-5 h-5" aria-hidden="true" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}
