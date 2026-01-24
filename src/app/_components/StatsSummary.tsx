import { Bookmark } from "lucide-react";
import StatCard from "./StatCard";

interface StatsSummaryProps {
  totalSaved: number;
  categoriesCount: number;
  averageYears: number;
}

export default function StatsSummary({
  totalSaved,
  categoriesCount,
  averageYears,
}: StatsSummaryProps) {
  return (
    <section
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
      aria-label="Saved majors statistics"
    >
      <StatCard
        icon={Bookmark}
        iconColor="text-blue-600"
        value={totalSaved}
        label="Total Saved"
        bgColor="bg-blue-100"
      />

      <StatCard
        emoji="📚"
        value={categoriesCount}
        label="Categories"
        bgColor="bg-purple-100"
      />

      <StatCard
        emoji="⏱️"
        value={averageYears}
        label="Avg. Years"
        bgColor="bg-green-100"
      />
    </section>
  );
}
