import ComparisonTableHeader from "./ComparisonTableHeader";
import ComparisonRow from "./ComparisonRow";
import JobOpportunitiesRow from "./JobOpportunitiesRow";
import SkillsRow from "./SkillsRow";
import { Major } from "../_lib/types";
import { CompareTranslations } from "@/app/translations/en/compare";

interface ComparisonTableProps {
  major1: Major;
  major2: Major;
  t: CompareTranslations["comparisonTable"];
}

export default function ComparisonTable({
  major1,
  major2,
  t,
}: ComparisonTableProps) {
  return (
    <section
      className="bg-white rounded-xl border border-gray-200 overflow-hidden"
      aria-labelledby="comparison-heading"
    >
      <h2 id="comparison-heading" className="sr-only">
        {t.srOnlyHeading} {major1.nameEn} {t.vs} {major2.nameEn}
      </h2>

      <ComparisonTableHeader
        major1Name={major1.nameEn}
        major1NameArabic={major1.nameAr}
        major2Name={major2.nameEn}
        major2NameArabic={major2.nameAr}
      />

      <div role="table" aria-label={t.ariaLabel}>
        <ComparisonRow
          label={t.rows.duration}
          value1={major1.duration}
          value2={major2.duration}
        />
        <ComparisonRow
          label={t.rows.minGPA}
          value1={`${major1.minGPA}%`}
          value2={`${major2.minGPA}%`}
        />
        <ComparisonRow
          label={t.rows.difficulty}
          value1={major1.difficulty}
          value2={major2.difficulty}
        />
        <ComparisonRow
          label={t.rows.averageSalary}
          value1={major1.averageSalary}
          value2={major2.averageSalary}
        />

        {major1.demandInIraq && major2.demandInIraq && (
          <ComparisonRow
            label={t.rows.demandInIraq}
            value1={major1.demandInIraq}
            value2={major2.demandInIraq}
            isLongText
          />
        )}

        {major1.demandOutsideIraq && major2.demandOutsideIraq && (
          <ComparisonRow
            label={t.rows.demandOutsideIraq}
            value1={major1.demandOutsideIraq}
            value2={major2.demandOutsideIraq}
            isLongText
          />
        )}

        <JobOpportunitiesRow
          label={t.rows.jobOpportunities}
          jobs1={major1.jobOpportunities || []}
          jobs2={major2.jobOpportunities || []}
        />

        <SkillsRow
          label={t.rows.skills}
          skills1={major1.skills || []}
          skills2={major2.skills || []}
        />
      </div>
    </section>
  );
}
