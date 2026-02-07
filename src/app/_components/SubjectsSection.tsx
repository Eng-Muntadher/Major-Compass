import { GraduationCap } from "lucide-react";
import { MajorDetailsType } from "@/app/translations/en/majorDetails";

interface SubjectsSectionProps {
  subjects: string[] | [];
  t: MajorDetailsType["subjects"];
}

function SubjectsSection({ subjects, t }: SubjectsSectionProps) {
  return (
    <section
      className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
      aria-labelledby="subjects-heading"
    >
      <h2
        id="subjects-heading"
        className="text-xl mb-4 flex items-center gap-2 font-semibold"
      >
        <GraduationCap className="w-6 h-6 text-blue-600" aria-hidden="true" />
        {t.heading}
      </h2>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {subjects.map((subject, index) => (
          <li
            key={index}
            className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg"
          >
            <span
              className="w-2 h-2 bg-blue-600 rounded-full shrink-0"
              aria-hidden="true"
            />
            <span className="text-gray-700">{subject}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SubjectsSection;
