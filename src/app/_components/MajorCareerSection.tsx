import { Briefcase } from "lucide-react";
import { MajorDetailsType } from "@/app/translations/en/majorDetails";

interface CareerSectionProps {
  jobs: string[] | [];
  salary: string | null;
  t: MajorDetailsType["career"];
}

function MajorCareerSection({ jobs, salary, t }: CareerSectionProps) {
  return (
    <section
      className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
      aria-labelledby="career-heading"
    >
      <h2
        id="career-heading"
        className="text-xl mb-2 flex items-center gap-2 font-semibold"
      >
        <Briefcase className="w-6 h-6 text-green-600" aria-hidden="true" />
        {t.heading}
      </h2>

      <p className="text-gray-600 mb-4">
        <span className="font-medium">{t.averageSalary}</span> {salary}
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
        {jobs.map((job, index) => (
          <li
            key={index}
            className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100"
          >
            <Briefcase
              className="w-5 h-5 text-green-600 shrink-0"
              aria-hidden="true"
            />
            <span className="text-gray-700">{job}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MajorCareerSection;
