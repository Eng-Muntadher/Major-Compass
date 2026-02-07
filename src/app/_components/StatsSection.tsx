import { HomeTranslationTypes } from "../translations/en/home";
import StatItem from "./StatItem";

interface StatsSectionProps {
  stats: HomeTranslationTypes["stats"];
}

function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-16 border border-blue-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {stats.map((stat, index) => (
          <StatItem key={index} {...stat} />
        ))}
      </div>
    </div>
  );
}

export default StatsSection;
