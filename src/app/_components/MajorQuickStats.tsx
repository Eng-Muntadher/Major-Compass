import { Award, BarChart2, Clock, TrendingUp } from "lucide-react";
import { Major } from "../_lib/types";
import { MajorDetailsType } from "../translations/en/majorDetails";

const difficultyColors = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-orange-100 text-orange-700",
  "Very Hard": "bg-red-100 text-red-700",
};

interface QuickStatsProps {
  major: Major;
  t: MajorDetailsType["quickStats"];
}

function MajorQuickStats({ major, t }: QuickStatsProps) {
  return (
    <>
      <h2 id="quick-stats-heading" className="sr-only">
        {t.heading}
      </h2>
      <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 border-b border-gray-200">
        <div className="text-center">
          <dt className="sr-only">{t.minGPA.ariaLabel}</dt>
          <Award
            className="w-6 h-6 text-blue-600 mx-auto mb-2"
            aria-hidden="true"
          />
          <div className="text-sm text-gray-500 mb-1">{t.minGPA.label}</div>
          <dd className="text-lg font-semibold">{major?.minGPA}%</dd>
        </div>

        <div className="text-center">
          <dt className="sr-only">{t.duration.ariaLabel}</dt>
          <Clock
            className="w-6 h-6 text-purple-600 mx-auto mb-2"
            aria-hidden="true"
          />
          <div className="text-sm text-gray-500 mb-1">{t.duration.label}</div>
          <dd className="text-lg font-semibold">
            {t.duration.label.startsWith("D")
              ? major?.duration
              : major.duration?.replace("years", "سنين")}
          </dd>
        </div>

        <div className="text-center">
          <dt className="sr-only">{t.jobs.ariaLabel}</dt>
          <TrendingUp
            className="w-6 h-6 text-green-600 mx-auto mb-2"
            aria-hidden="true"
          />
          <div className="text-sm text-gray-500 mb-1">{t.jobs.label}</div>
          <dd className="text-lg font-semibold">
            {major?.jobOpportunities?.length}
            {t.jobs.suffix}
          </dd>
        </div>

        <div className="text-center">
          <dt className="sr-only">{t.difficulty.ariaLabel}</dt>
          <BarChart2
            className="w-6 h-6 text-yellow-500 mx-auto mb-2"
            aria-hidden="true"
          />
          <div className="text-sm text-gray-500 mb-1">{t.difficulty.label}</div>
          <dd>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${major ? difficultyColors[major.difficulty as "Easy" | "Hard" | "Medium"] : ""}`}
            >
              {major
                ? t.difficulty.levels[
                    major.difficulty as "Easy" | "Hard" | "Medium"
                  ]
                : ""}
            </span>
          </dd>
        </div>
      </dl>
    </>
  );
}

export default MajorQuickStats;
