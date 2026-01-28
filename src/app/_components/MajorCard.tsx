import { BookmarkIcon, TrendingUp, Clock, Award } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";
import Link from "next/link";
import { MajorEN } from "../_lib/types";

interface MajorCardProps {
  major: MajorEN;
}

const difficultyColors = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-orange-100 text-orange-700",
  "Very Hard": "bg-red-100 text-red-700",
};

export function MajorCard({ major }: MajorCardProps) {
  return (
    <Link
      href={`/browse/${major.id}`}
      aria-labelledby={`major-${major.id}-title`}
      className="block bg-white rounded-xl border border-gray-200 overflow-hidden
                 hover:shadow-lg transition-all duration-300 group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-linear-to-br from-blue-100 to-purple-100">
        <ImageWithFallback
          src={major.imageUrl}
          alt={major?.nameEn ? `${major.nameEn} major` : "Major image"}
          objectFit="cover"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Save button */}
        <button
          type="button"
          className="absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm cursor-pointer transition-allbg-white/90 text-gray-600 hover:bg-white"

          // aria-pressed={isSaved}
          // aria-label={isSaved ? "Remove from saved majors" : "Save major"}
        >
          <BookmarkIcon
            // className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`}
            aria-hidden="true"
          />
        </button>

        {/* Difficulty badge */}
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs backdrop-blur-sm ${difficultyColors[major.difficulty]}`}
        >
          {major.difficulty}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <header className="mb-2">
          <h3
            id={`major-${major.id}-title`}
            className="text-lg mb-1 group-hover:text-blue-600 transition-colors"
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
            <Award className="w-4 h-4 text-blue-600" aria-hidden="true" />
            <dt className="sr-only">Minimum GPA</dt>
            <dd className="text-gray-600">{major.minGPA}%</dd>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-600" aria-hidden="true" />
            <dt className="sr-only">Duration</dt>
            <dd className="text-gray-600">{major.duration}</dd>
          </div>
        </dl>

        {/* Job opportunities */}
        <div className="flex items-center gap-2 mt-3 text-sm text-green-600">
          <TrendingUp className="w-4 h-4" aria-hidden="true" />
          <span>{major.jobOpportunities?.length} career paths</span>
        </div>
      </div>
    </Link>
  );
}
