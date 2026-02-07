import { AlertCircle } from "lucide-react";
import { MajorDetailsType } from "@/app/translations/en/majorDetails";

interface GPANoticeProps {
  t: MajorDetailsType["gpaNotice"];
}

function GPANotice({ t }: GPANoticeProps) {
  return (
    <aside
      className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6"
      role="note"
      aria-labelledby="gpa-notice-title"
    >
      <div className="flex items-start xl:items-center gap-3">
        <AlertCircle
          className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5"
          aria-hidden="true"
        />

        <p className="text-sm text-yellow-800">
          <strong id="gpa-notice-title">{t.title}</strong> {t.message}
        </p>
      </div>
    </aside>
  );
}

export default GPANotice;
