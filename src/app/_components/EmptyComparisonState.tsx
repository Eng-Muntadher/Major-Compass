import { ArrowLeftRight } from "lucide-react";
import { CompareTranslations } from "@/app/translations/en/compare";

interface EmptyComparisonStateProps {
  t: CompareTranslations["emptyState"];
}

export default function EmptyComparisonState({ t }: EmptyComparisonStateProps) {
  return (
    <div
      className="bg-white rounded-xl border border-gray-200 p-12 text-center"
      role="status"
      aria-live="polite"
    >
      <div
        className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
        aria-hidden="true"
      >
        <ArrowLeftRight className="w-10 h-10 text-purple-600" />
      </div>
      <h2 className="text-xl mb-2 font-semibold">{t.heading}</h2>
      <p className="text-gray-600">{t.description}</p>
    </div>
  );
}
