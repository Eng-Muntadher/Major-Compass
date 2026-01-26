import StatsSummary from "./StatsSummary";
import CompareCTABanner from "./CompareCTABanner";
import { Major } from "../_data/majors";
import MajorsAnimatedGrid from "./MajorsAnimatedGrid";
import MajorAnimatedItem from "./MajorAnimatedItem";
import { MajorCard } from "./MajorCard";

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

      {/* Majors list */}
      <MajorsAnimatedGrid>
        {majors.map((major) => (
          <MajorAnimatedItem key={major.id}>
            <MajorCard major={major} />
          </MajorAnimatedItem>
        ))}
      </MajorsAnimatedGrid>

      <CompareCTABanner />
    </div>
  );
}
