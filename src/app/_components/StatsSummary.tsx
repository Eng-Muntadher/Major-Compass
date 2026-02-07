import { Bookmark } from "lucide-react";
import StatCard from "./StatCard";
import { SavedMajorsTranslationTypes } from "../translations/en/savedMajors";

interface StatsSummaryProps {
  totalSaved: number;
  categoriesCount: number;
  averageYears: number;
  stats: SavedMajorsTranslationTypes["stats"];
}

export default function StatsSummary({
  totalSaved,
  categoriesCount,
  averageYears,
  stats,
}: StatsSummaryProps) {
  return (
    <section aria-label="Saved majors statistics">
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          icon={Bookmark}
          iconColor="text-blue-600"
          value={totalSaved}
          label={stats.total}
          bgColor="bg-blue-100"
        />

        <StatCard
          emoji="📚"
          value={categoriesCount}
          label={stats.categories}
          bgColor="bg-purple-100"
        />

        <StatCard
          emoji="⏱️"
          value={averageYears}
          label={stats.AvgYears}
          bgColor="bg-green-100"
        />
      </ul>
    </section>
  );
}
