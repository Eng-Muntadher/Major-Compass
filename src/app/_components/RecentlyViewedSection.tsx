import { Clock } from "lucide-react";

interface Major {
  id: string;
  name: string;
  nameArabic: string;
}

interface RecentlyViewedSectionProps {
  majors: Major[];
}

export default function RecentlyViewedSection({
  majors,
}: RecentlyViewedSectionProps) {
  if (majors.length === 0) {
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
          Recently Viewed
        </h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {majors.map((major) => (
          <button
            key={major.id}
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
            aria-label={`View ${major.name}`}
          >
            <h3 className="mb-1 group-hover:text-blue-600 transition-colors font-semibold">
              {major.name}
            </h3>
            <p className="text-sm text-gray-500">{major.nameArabic}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
