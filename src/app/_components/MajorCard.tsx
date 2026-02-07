import { TrendingUp, Clock, Award } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";
import Link from "next/link";
import { Major } from "../_lib/types";
import SaveMajorButton from "./SaveMajorButton";

interface MajorCardProps {
  major: Partial<Major>;
  isSaved: boolean;
  index: number;
  isUserAuthenticated: boolean;
}

const difficultyColors = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-orange-100 text-orange-700",
  "Very Hard": "bg-red-100 text-red-700",
};

export function MajorCard({
  major,
  isSaved,
  index,
  isUserAuthenticated,
}: MajorCardProps) {
  return (
    <Link
      href={`/browse/${major.id}`}
      aria-labelledby={`major-${major.id}-title`}
      className="
        block bg-white rounded-xl border border-gray-200 overflow-hidden
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100/60
        hover:border-blue-200
        group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-linear-to-br from-blue-100 to-purple-100">
        <ImageWithFallback
          src={major.imageUrl}
          priority={index === 0}
          sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 50vw,
         33vw"
          alt={major?.nameEn ? `${major.nameEn} major` : "Major image"}
          objectFit="cover"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />

        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15 pointer-events-none" />

        {/* Save button */}
        <SaveMajorButton
          isSaved={isSaved}
          majorId={major.id}
          isUserAuthenticated={isUserAuthenticated}
        />

        {/* Difficulty badge */}
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs backdrop-blur-sm ${difficultyColors[major.difficulty as "Easy" | "Medium" | "Hard"]}`}
        >
          {major.difficulty}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <header className="mb-2">
          <h3
            id={`major-${major.id}-title`}
            className="text-lg mb-1 transition-colors duration-300 group-hover:text-blue-600 line-clamp-1"
          >
            {major.nameEn}
          </h3>
          <p className="text-sm text-gray-500">{major.nameAr}</p>
        </header>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {major.description}
        </p>

        {/* Info list */}
        <dl className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 text-sm">
          <div className="flex items-center gap-2">
            <Award
              className="w-4 h-4 text-blue-600 transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            />
            <dt className="sr-only">Minimum GPA</dt>
            <dd className="text-gray-600">{major.minGPA}%</dd>
          </div>

          <div className="flex items-center gap-2">
            <Clock
              className="w-4 h-4 text-purple-600 transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            />
            <dt className="sr-only">Duration</dt>
            <dd className="text-gray-600">{major.duration}</dd>
          </div>
        </dl>

        {/* Job opportunities */}
        <div className="flex items-center gap-2 mt-3 text-sm text-green-600">
          <TrendingUp
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
          <span>{major.jobOpportunities?.length} career paths</span>
        </div>
      </div>
    </Link>
  );
}
