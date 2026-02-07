import { Award } from "lucide-react";
import Link from "next/link";
import { createClient } from "../_lib/supabase";
import { getSimilarMajorsInEnglish } from "../_lib/supabaseHelpers";
import { MajorDetailsType } from "@/app/translations/en/majorDetails";

interface SimilarMajorsProps {
  similarMajorsList: string[];
  t: MajorDetailsType["similarMajors"];
  lang: "en" | "ar";
}

async function SimilarMajors({
  similarMajorsList,
  t,
  lang,
}: SimilarMajorsProps) {
  const supabase = await createClient();
  const majors = await getSimilarMajorsInEnglish(supabase, similarMajorsList);

  if (!majors) return null;

  return (
    <section
      className="bg-white rounded-xl border border-gray-200 p-6"
      aria-labelledby="similar-majors-heading"
    >
      <h2 id="similar-majors-heading" className="text-xl mb-4 font-semibold">
        {t.heading}
      </h2>

      <ul
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        role="list"
      >
        {majors.map((similarMajor) => (
          <li key={similarMajor.id}>
            <Link
              href={`/${lang}/browse/${similarMajor.id}`}
              className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <h3 className="mb-1 font-semibold">{similarMajor.nameEn}</h3>

              <p className="text-sm text-gray-500 mb-2" lang="ar">
                {similarMajor.nameAr}
              </p>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Award className="w-4 h-4" aria-hidden="true" />
                <span>
                  {t.minGPA} {similarMajor.minGPA}%
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SimilarMajors;
