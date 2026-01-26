import { Brain } from "lucide-react";

interface SkillsSectionProps {
  skills: string[];
}

function MajorSkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section
      className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
      aria-labelledby="skills-heading"
    >
      <h2
        id="skills-heading"
        className="text-xl mb-4 flex items-center gap-2 font-semibold"
      >
        <Brain className="w-6 h-6 text-purple-600" aria-hidden="true" />
        Required Skills
      </h2>

      <ul className="flex flex-wrap gap-2" role="list">
        {skills.map((skill, index) => (
          <li
            key={index}
            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
          >
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MajorSkillsSection;
