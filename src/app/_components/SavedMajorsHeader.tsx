import { Bookmark } from "lucide-react";

interface SavedMajorsHeaderProps {
  count: number;
}

export default function SavedMajorsHeader({ count }: SavedMajorsHeaderProps) {
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
      </div>

      <p className="text-gray-600">
        Your personal collection of majors you&apos;re interested in
      </p>
    </header>
  );
}
