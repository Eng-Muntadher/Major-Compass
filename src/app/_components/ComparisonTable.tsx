import ComparisonTableHeader from "./ComparisonTableHeader";
import ComparisonRow from "./ComparisonRow";
import JobOpportunitiesRow from "./JobOpportunitiesRow";
import SkillsRow from "./SkillsRow";

interface Major {
  id: string;
  name: string;
  nameArabic: string;
  duration: string;
  minGPA: number;
  difficulty: string;
  averageSalary: string;
  demandInIraq?: string;
  demandOutsideIraq?: string;
  jobOpportunities: string[];
  skills: string[];
}

interface ComparisonTableProps {
  major1: Major;
  major2: Major;
}

export default function ComparisonTable({
  major1,
  major2,
}: ComparisonTableProps) {
  return (
    <section
      className="bg-white rounded-xl border border-gray-200 overflow-hidden"
      aria-labelledby="comparison-heading"
    >
      <h2 id="comparison-heading" className="sr-only">
        Major Comparison: {major1.name} vs {major2.name}
      </h2>

      <ComparisonTableHeader
        major1Name={major1.name}
        major1NameArabic={major1.nameArabic}
        major2Name={major2.name}
        major2NameArabic={major2.nameArabic}
      />

      <div role="table" aria-label="Major comparison details">
        <ComparisonRow
          label="Duration"
          value1={major1.duration}
          value2={major2.duration}
        />
        <ComparisonRow
          label="Minimum GPA"
          value1={`${major1.minGPA}%`}
          value2={`${major2.minGPA}%`}
        />
        <ComparisonRow
          label="Difficulty Level"
          value1={major1.difficulty}
          value2={major2.difficulty}
        />
        <ComparisonRow
          label="Average Salary (USA)"
          value1={major1.averageSalary}
          value2={major2.averageSalary}
        />

        {major1.demandInIraq && major2.demandInIraq && (
          <ComparisonRow
            label="Demand Inside Iraq"
            value1={major1.demandInIraq}
            value2={major2.demandInIraq}
            isLongText
          />
        )}

        {major1.demandOutsideIraq && major2.demandOutsideIraq && (
          <ComparisonRow
            label="Demand Outside Iraq"
            value1={major1.demandOutsideIraq}
            value2={major2.demandOutsideIraq}
            isLongText
          />
        )}

        <JobOpportunitiesRow
          jobs1={major1.jobOpportunities}
          jobs2={major2.jobOpportunities}
        />

        <SkillsRow skills1={major1.skills} skills2={major2.skills} />
      </div>
    </section>
  );
}
