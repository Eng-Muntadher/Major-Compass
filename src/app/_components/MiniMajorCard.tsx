import { Bookmark } from "lucide-react";
import Link from "next/link";
import { RecentlySavedMajor } from "../actions";

interface MiniMajorCardProps {
  major: RecentlySavedMajor;
}

const difficultyColors = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-orange-100 text-orange-700",
  "Very Hard": "bg-red-100 text-red-700",
};

export default function MiniMajorCard({ major }: MiniMajorCardProps) {
  return (
    <Link
      href={`/browse/${major.id}`}
      className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="flex-1 text-left cursor-pointer"
          aria-label={`View details for ${major.nameEn}`}
        >
          <h3 className="mb-1 group-hover:text-blue-600 transition-colors font-semibold">
            {major.nameEn}
          </h3>
          <p className="text-sm text-gray-500">{major.nameAr}</p>
        </div>

        <div className="p-2 rounded-lg transition-colors text-blue-600">
          <Bookmark className="w-5 h-5 fill-current" aria-hidden="true" />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span
          className={`px-2 py-1 rounded-full text-xs ${difficultyColors[major.difficulty as keyof typeof difficultyColors]}`}
          aria-label={`Difficulty: ${major.difficulty}`}
        >
          {major.difficulty}
        </span>
        <span className="text-gray-600">Min GPA: {major.minGPA}%</span>
      </div>
    </Link>
  );
}
