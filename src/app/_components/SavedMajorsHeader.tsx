import { Bookmark, Trash2 } from "lucide-react";

interface SavedMajorsHeaderProps {
  count: number;
  onClearAll: () => void;
}

export default function SavedMajorsHeader({
  count,
  onClearAll,
}: SavedMajorsHeaderProps) {
  return (
    <header className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center"
            aria-hidden="true"
          >
            <Bookmark className="w-6 h-6 text-white" aria-hidden="true" />
          </div>

          <div>
            <h1 className="text-3xl">Saved Majors</h1>

            <p className="text-gray-600" aria-live="polite">
              {count} {count === 1 ? "major saved" : "majors saved"}
            </p>
          </div>
        </div>

        {count > 0 && (
          <button
            onClick={onClearAll}
            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            aria-label="Clear all saved majors"
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Clear All</span>
          </button>
        )}
      </div>

      <p className="text-gray-600">
        Your personal collection of majors you&apos;re interested in
      </p>
    </header>
  );
}
