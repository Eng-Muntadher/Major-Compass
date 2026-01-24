import { BookmarkX } from "lucide-react";
import Link from "next/link";

export default function EmptySavedState() {
  return (
    <section
      className="text-center py-20"
      role="status"
      aria-labelledby="empty-state-heading"
    >
      <div
        className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
        aria-hidden="true"
      >
        <BookmarkX className="w-12 h-12 text-gray-400" />
      </div>
      <h2 id="empty-state-heading" className="text-2xl font-semibold mb-2">
        No saved majors yet
      </h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Start exploring majors and save the ones that interest you. Click the
        bookmark icon on any major card to add it here.
      </p>
      <nav
        className="flex flex-col sm:flex-row gap-3 justify-center"
        aria-label="Quick actions"
      >
        <Link
          href="/browse"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse Majors
        </Link>
        <Link
          href="/tips-and-advice"
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Get Tips & Advice
        </Link>
      </nav>
    </section>
  );
}
