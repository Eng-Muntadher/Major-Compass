// app/majors/[majorId]/_components/HeroSection.tsx
import { BookmarkIcon } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";
import { getMajorImage } from "../_utils/images";
import { Major } from "../_data/majors";

interface HeroDetailsHeroProps {
  major: Major;
}

function MajorDetailsHeroSection({ major }: HeroDetailsHeroProps) {
  return (
    <section
      className="bg-white rounded-xl border border-gray-200 overflow-hidden"
      aria-labelledby="major-title"
    >
      <div className="relative h-64 bg-linear-to-br from-blue-100 to-purple-100">
        <ImageWithFallback
          src={getMajorImage(major.id)}
          alt={`Image of ${major.id}`}
          className="w-full h-full object-cover"
          role="presentation"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

        {/* Title and Save Button */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 id="major-title" className="text-3xl mb-2 font-bold">
                {major.name}
              </h1>

              <p className="text-xl opacity-90" lang="ar">
                {major.nameArabic}
              </p>
            </div>

            <button
              className="p-3 rounded-full hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/60 cursor-pointer"
              aria-label={`Bookmark ${major.name}`}
            >
              <BookmarkIcon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MajorDetailsHeroSection;
