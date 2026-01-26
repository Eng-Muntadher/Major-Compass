// app/majors/[majorId]/_components/QuickStats.tsx
import { Award, Clock, TrendingUp } from "lucide-react";
import { Major } from "../_data/majors";

const difficultyColors = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-orange-100 text-orange-700",
  "Very Hard": "bg-red-100 text-red-700",
};

interface QuickStatsProps {
  major: Major;
}

function MajorQuickStats({ major }: QuickStatsProps) {
  return (
    <>
      <h2 id="quick-stats-heading" className="sr-only">
        Quick Statistics
      </h2>
      <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 border-b border-gray-200">
        <div className="text-center">
          <dt className="sr-only">Minimum GPA Required</dt>
          <Award
            className="w-6 h-6 text-blue-600 mx-auto mb-2"
            aria-hidden="true"
          />
          <div className="text-sm text-gray-500 mb-1">Min GPA</div>
          <dd className="text-lg font-semibold">{major.minGPA}%</dd>
        </div>

        <div className="text-center">
          <dt className="sr-only">Program Duration</dt>
          <Clock
            className="w-6 h-6 text-purple-600 mx-auto mb-2"
            aria-hidden="true"
          />
          <div className="text-sm text-gray-500 mb-1">Duration</div>
          <dd className="text-lg font-semibold">{major.duration}</dd>
        </div>

        <div className="text-center">
          <dt className="sr-only">Number of Career Opportunities</dt>
          <TrendingUp
            className="w-6 h-6 text-green-600 mx-auto mb-2"
            aria-hidden="true"
          />
          <div className="text-sm text-gray-500 mb-1">Jobs</div>
          <dd className="text-lg font-semibold">
            {major.jobOpportunities.length}+
          </dd>
        </div>

        <div className="text-center">
          <dt className="sr-only">Program Difficulty Level</dt>
          <dd>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[major.difficulty]}`}
            >
              {major.difficulty}
            </span>
          </dd>
          <div className="text-sm text-gray-500 mt-1">Difficulty</div>
        </div>
      </dl>
    </>
  );
}

export default MajorQuickStats;
