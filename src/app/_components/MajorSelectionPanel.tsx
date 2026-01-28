import { MajorEN } from "../_lib/types";
import MajorSelector from "./MajorSelector";

interface MajorSelectionPanelProps {
  majors: MajorEN[] | null;
  major1Id: string;
  major2Id: string;
  onMajor1Change: (id: string) => void;
  onMajor2Change: (id: string) => void;
}

export default function MajorSelectionPanel({
  majors,
  major1Id,
  major2Id,
  onMajor1Change,
  onMajor2Change,
}: MajorSelectionPanelProps) {
  return (
    <section
      className="bg-white rounded-xl p-6 border border-gray-200 mb-8"
      aria-label="Major selection"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MajorSelector
          id="major1-select"
          label="Select First Major"
          value={major1Id}
          onChange={onMajor1Change}
          majors={majors}
          excludeId={major2Id}
        />

        <MajorSelector
          id="major2-select"
          label="Select Second Major"
          value={major2Id}
          onChange={onMajor2Change}
          majors={majors}
          excludeId={major1Id}
        />
      </div>
    </section>
  );
}
