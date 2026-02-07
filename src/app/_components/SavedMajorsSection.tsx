import { Bookmark } from "lucide-react";
import MiniMajorCard from "./MiniMajorCard";
import { RecentlySavedMajor } from "../_lib/types";
import { ProfileTranslationTypes } from "../translations/en/profile";

interface SavedMajorsSectionProps {
  savedMajors: RecentlySavedMajor[];
  translations: ProfileTranslationTypes["sections"]["savedMajors"];
}

export default function SavedMajorsSection({
  savedMajors,
  translations,
}: SavedMajorsSectionProps) {
  return (
    <section
      className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
      aria-labelledby="saved-majors-heading"
    >
      <header className="flex items-center gap-2 mb-6">
        <Bookmark className="w-6 h-6 text-blue-600" aria-hidden="true" />
        <h2 id="saved-majors-heading" className="text-2xl">
          {translations.title}
        </h2>
      </header>

      {savedMajors.length === 0 ? (
        <div className="text-center py-12" role="status">
          <div
            className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
            aria-hidden="true"
          >
            <Bookmark className="w-8 h-8 text-gray-400" aria-hidden="true" />
          </div>
          <p className="text-gray-600 mb-2 font-medium">
            {translations.noSaved}
          </p>
          <p className="text-sm text-gray-500">{translations.description}</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedMajors.map((major) => (
            <MiniMajorCard key={major.id} major={major} />
          ))}
        </ul>
      )}
    </section>
  );
}
