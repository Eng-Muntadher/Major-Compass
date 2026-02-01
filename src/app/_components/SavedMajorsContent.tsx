import StatsSummary from "./StatsSummary";
import CompareCTABanner from "./CompareCTABanner";
import MajorsAnimatedGrid from "./MajorsAnimatedGrid";
import MajorAnimatedItem from "./MajorAnimatedItem";
import { MajorCard } from "./MajorCard";
import { MajorEN } from "../_lib/types";

interface SavedMajorsContentProps {
  savedMajors: MajorEN[];
  savedMajorsIds: string[];
  isUserAuthenticated: boolean;
}

export default function SavedMajorsContent({
  savedMajors,
  savedMajorsIds,
  isUserAuthenticated,
}: SavedMajorsContentProps) {
  const categoriesCount = new Set(savedMajors.map((m) => m.category)).size;

  const averageYears = Math.round(
    savedMajors.reduce((sum, m) => sum + parseInt(m.duration), 0) /
      savedMajors.length,
  );

  return (
    <div>
      <StatsSummary
        totalSaved={savedMajors.length}
        categoriesCount={categoriesCount}
        averageYears={averageYears}
      />

      {/* Majors list */}
      <MajorsAnimatedGrid>
        {savedMajors.map((major) => (
          <MajorAnimatedItem key={major.id}>
            <MajorCard
              major={major}
              isSaved={savedMajorsIds.includes(major.id) ? true : false}
              isUserAuthenticated={isUserAuthenticated}
            />
          </MajorAnimatedItem>
        ))}
      </MajorsAnimatedGrid>

      <CompareCTABanner />
    </div>
  );
}
