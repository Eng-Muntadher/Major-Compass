import { Check } from "lucide-react";

interface JobOpportunitiesRowProps {
  jobs1: string[];
  jobs2: string[];
}

export default function JobOpportunitiesRow({
  jobs1,
  jobs2,
}: JobOpportunitiesRowProps) {
  return (
    <div className="grid grid-cols-3 border-t border-gray-200">
      <div className="p-4 bg-gray-50">
        <p className="text-sm font-medium">Job Opportunities</p>
      </div>
      <div className="p-4 border-l border-gray-200">
        <ul
          className="space-y-1"
          aria-label="Job opportunities for first major"
        >
          {jobs1.slice(0, 5).map((job, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <Check
                className="w-4 h-4 text-green-600 mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <span>{job}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 border-l border-gray-200">
        <ul
          className="space-y-1"
          aria-label="Job opportunities for second major"
        >
          {jobs2.slice(0, 5).map((job, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <Check
                className="w-4 h-4 text-green-600 mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <span>{job}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
