import StatsSummary from "./StatsSummary";
import MajorsGrid from "./MajorsGrid";
import CompareCTABanner from "./CompareCTABanner";
import { Major } from "../_data/majors";

interface SavedMajorsContentProps {
  majors: Major[];
}

export default function SavedMajorsContent({
  majors,
}: SavedMajorsContentProps) {
  const categoriesCount = new Set(majors.map((m) => m.category)).size;

  const averageYears = Math.round(
    majors.reduce((sum, m) => sum + parseInt(m.duration), 0) / majors.length,
  );

  return (
    <div>
      <StatsSummary
        totalSaved={majors.length}
        categoriesCount={categoriesCount}
        averageYears={averageYears}
      />

      <MajorsGrid majors={majors} />

      <CompareCTABanner />
    </div>
  );
}
