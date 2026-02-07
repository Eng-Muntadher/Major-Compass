import { ArrowLeftRight } from "lucide-react";
import { CompareTranslations } from "@/app/translations/en/compare";

interface CompareHeaderProps {
  t: CompareTranslations["header"];
}

export default function CompareHeader({ t }: CompareHeaderProps) {
  return (
    <header className="mb-8">
      <div className="flex items-center max-sm:items-start gap-3 mb-4">
        <div
          className="w-12 h-12 bg-linear-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center"
          aria-hidden="true"
        >
          <ArrowLeftRight className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl">{t.title}</h1>
          <p className="text-gray-600">{t.description}</p>
        </div>
      </div>
    </header>
  );
}
