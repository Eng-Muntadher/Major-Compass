import { Major } from "../_lib/types";
import MajorSelector from "./MajorSelector";
import { CompareTranslations } from "@/app/translations/en/compare";

interface MajorSelectionPanelProps {
  majors: Major[] | null;
  major1Id: string;
  major2Id: string;
  onMajor1Change: (id: string) => void;
  onMajor2Change: (id: string) => void;
  t: CompareTranslations["selection"];
}

export default function MajorSelectionPanel({
  majors,
  major1Id,
  major2Id,
  onMajor1Change,
  onMajor2Change,
  t,
}: MajorSelectionPanelProps) {
  // Determine the current language without the need to read the URL
  const currentLanguage = t.firstMajor.startsWith("S") ? "en" : "ar";
  return (
    <section
      className="bg-white rounded-xl p-6 border border-gray-200 mb-8"
      aria-label={t.ariaLabel}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MajorSelector
          id="major1-select"
          label={t.firstMajor}
          lang={currentLanguage}
          value={major1Id}
          onChange={onMajor1Change}
          majors={majors}
          excludeId={major2Id}
        />

        <MajorSelector
          id="major2-select"
          label={t.secondMajor}
          lang={currentLanguage}
          value={major2Id}
          onChange={onMajor2Change}
          majors={majors}
          excludeId={major1Id}
        />
      </div>
    </section>
  );
}
