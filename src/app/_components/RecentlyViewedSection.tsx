import { Clock } from "lucide-react";
import Link from "next/link";
import { RecentlyViewedMajor } from "../_lib/types";
import { ProfileTranslationTypes } from "../translations/en/profile";

interface RecentlyViewedSectionProps {
  recentlyViewedMajors: RecentlyViewedMajor[];
  translations: ProfileTranslationTypes["sections"]["recentlyViewed"];
}

export default function RecentlyViewedSection({
  recentlyViewedMajors,
  translations,
}: RecentlyViewedSectionProps) {
  if (recentlyViewedMajors.length === 0) {
    return null;
  }

  return (
    <section
      className="bg-white rounded-xl border border-gray-200 p-6"
      aria-labelledby="recently-viewed-heading"
    >
      <header className="flex items-center gap-2 mb-6">
        <Clock className="w-6 h-6 text-purple-600" aria-hidden="true" />
        <h2 id="recently-viewed-heading" className="text-2xl">
          {translations.title}
        </h2>
      </header>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentlyViewedMajors.map((major) => (
          <li key={major.id}>
            <Link
              href={`/browse/${major.id}`}
              className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
              aria-label={`View ${major.nameEn}`}
            >
              <h3 className="mb-1 group-hover:text-blue-600 transition-colors font-semibold">
                {major.nameEn}
              </h3>
              <p className="text-sm text-gray-500">{major.nameAr}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
