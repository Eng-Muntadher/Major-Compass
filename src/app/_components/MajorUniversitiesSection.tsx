import { Building } from "lucide-react";
import { MajorDetailsType } from "@/app/translations/en/majorDetails";

interface UniversitiesSectionProps {
  universities: string[] | [];
  t: MajorDetailsType["universities"];
}

function MajorUniversitiesSection({
  universities,
  t,
}: UniversitiesSectionProps) {
  return (
    <section
      className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
      aria-labelledby="universities-heading"
    >
      <h2
        id="universities-heading"
        className="text-xl mb-4 flex items-center gap-2 font-semibold"
      >
        <Building className="w-6 h-6 text-orange-600" aria-hidden="true" />
        {t.heading}
      </h2>

      <ol className="space-y-3" role="list">
        {universities.map((university, index) => (
          <li
            key={index}
            className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg"
          >
            <span
              className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center text-orange-700 font-semibold shrink-0"
              aria-label={`${t.rankLabel} ${index + 1}`}
            >
              {index + 1}
            </span>
            <span className="text-gray-700">{university}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default MajorUniversitiesSection;
