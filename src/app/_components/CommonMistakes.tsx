import { TrendingDown } from "lucide-react";
import { MajorDetailsType } from "@/app/translations/en/majorDetails";

interface CommonMistakesProps {
  mistakes: string[];
  t: MajorDetailsType["commonMistakes"];
}

function CommonMistakes({ mistakes, t }: CommonMistakesProps) {
  return (
    <section
      className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
      aria-labelledby="mistakes-heading"
    >
      <h2
        id="mistakes-heading"
        className="text-xl mb-4 flex items-center gap-2 text-red-600 font-semibold"
      >
        <TrendingDown className="w-6 h-6" aria-hidden="true" />
        {t.heading}
      </h2>

      <ol className="space-y-3" role="list">
        {mistakes.map((mistake, index) => (
          <li key={index} className="flex items-start gap-3">
            <span
              className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center shrink-0 mt-0.5"
              aria-hidden="true"
            >
              <span className="text-red-600 text-sm font-semibold">
                {index + 1}
              </span>
            </span>
            <span className="text-gray-700">{mistake}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default CommonMistakes;
