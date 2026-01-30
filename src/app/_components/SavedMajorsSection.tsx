import { Bookmark } from "lucide-react";
import MiniMajorCard from "./MiniMajorCard";
import { majors } from "../_data/majors";

export default function SavedMajorsSectio() {
  const savedMajorsList = [majors[0], majors[1]];

  return (
    <section
      className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
      aria-labelledby="saved-majors-heading"
    >
      <header className="flex items-center gap-2 mb-6">
        <Bookmark className="w-6 h-6 text-blue-600" aria-hidden="true" />
        <h2 id="saved-majors-heading" className="text-2xl">
          Recently Saved
        </h2>
      </header>

      {majors.length === 0 ? (
        <div className="text-center py-12" role="status">
          <div
            className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
            aria-hidden="true"
          >
            <Bookmark className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600 mb-2 font-medium">No saved majors yet</p>
          <p className="text-sm text-gray-500">
            Browse majors and click the bookmark icon to save them here
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedMajorsList.map((major) => (
            <MiniMajorCard key={major.id} major={major} isSaved={true} />
          ))}
        </div>
      )}
    </section>
  );
}
