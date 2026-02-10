import StatsSummary from "./StatsSummary";
import CompareCTABanner from "./CompareCTABanner";
import MajorsAnimatedGrid from "./MajorsAnimatedGrid";
import MajorAnimatedItem from "./MajorAnimatedItem";
import { MajorCard } from "./MajorCard";
import { Major } from "../_lib/types";
import { SavedMajorsTranslationTypes } from "../translations/en/savedMajors";

interface SavedMajorsContentProps {
  savedMajors: Partial<Major>[];
  savedMajorsIds: string[];
  isUserAuthenticated: boolean;
  lang: "en" | "ar";
  stats: SavedMajorsTranslationTypes["stats"];
  compareCTA: SavedMajorsTranslationTypes["compareCTA"];
}

export default function SavedMajorsContent({
  savedMajors,
  savedMajorsIds,
  isUserAuthenticated,
  stats,
  lang,
  compareCTA,
}: SavedMajorsContentProps) {
  const categoriesCount = new Set(savedMajors.map((m) => m.category)).size;

  const averageYears = Math.round(
    savedMajors.reduce((sum, m) => sum + parseInt(m.duration || ""), 0) /
      savedMajors.length,
  );

  return (
    <div>
      <StatsSummary
        stats={stats}
        totalSaved={savedMajors.length}
        categoriesCount={categoriesCount}
        averageYears={averageYears}
      />

      {/* Majors list */}
      <MajorsAnimatedGrid>
        {savedMajors.map((major, i) => (
          <MajorAnimatedItem key={major.id}>
            <MajorCard
              lang={lang}
              major={major}
              index={i}
              isSaved={
                savedMajorsIds.includes(major.id as string) ? true : false
              }
              isUserAuthenticated={isUserAuthenticated}
            />
          </MajorAnimatedItem>
        ))}
      </MajorsAnimatedGrid>

      <CompareCTABanner compareCTA={compareCTA} />
    </div>
  );
}
