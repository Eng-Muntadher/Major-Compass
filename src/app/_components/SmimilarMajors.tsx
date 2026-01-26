import { Award } from "lucide-react";
import Link from "next/link";
import { Major } from "../_data/majors";

interface SimilarMajorsProps {
  majors: Major[];
}

function SimilarMajors({ majors }: SimilarMajorsProps) {
  return (
    <section
      className="bg-white rounded-xl border border-gray-200 p-6"
      aria-labelledby="similar-majors-heading"
    >
      <h2 id="similar-majors-heading" className="text-xl mb-4 font-semibold">
        Similar Majors You Might Like
      </h2>

      <ul
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        role="list"
      >
        {majors.map((similarMajor) => (
          <li key={similarMajor.id}>
            <Link
              href={similarMajor.id}
              className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <h3 className="mb-1 font-semibold">{similarMajor.name}</h3>

              <p className="text-sm text-gray-500 mb-2" lang="ar">
                {similarMajor.nameArabic}
              </p>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Award className="w-4 h-4" aria-hidden="true" />
                <span>Min GPA: {similarMajor.minGPA}%</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SimilarMajors;
