interface SkillsRowProps {
  label: string;
  skills1: string[];
  skills2: string[];
}

export default function SkillsRow({ label, skills1, skills2 }: SkillsRowProps) {
  return (
    <div className="grid grid-cols-3 border-t border-gray-200">
      <div className="p-4 bg-gray-50">
        <p className="text-sm font-medium">{label}</p>
      </div>

      {/* Major 1 */}
      <div className="p-4 border-l border-gray-200 overflow-auto">
        <div
          className="flex flex-wrap gap-2"
          role="list"
          aria-label="Required skills for first major"
        >
          {skills1.map((skill, index) => (
            <span
              key={index}
              role="listitem"
              className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Major 2 */}
      <div className="p-4 border-l border-gray-200 overflow-auto">
        <div
          className="flex flex-wrap gap-2"
          role="list"
          aria-label="Required skills for second major"
        >
          {skills2.map((skill, index) => (
            <span
              key={index}
              role="listitem"
              className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
