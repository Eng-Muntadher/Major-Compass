import { AlertCircle } from "lucide-react";

function GPANotice() {
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
          <strong id="gpa-notice-title">Note:</strong> The GPA displayed is
          calculated based on the standards of the University of Baghdad.
          Requirements may vary by university.
        </p>
      </div>
    </aside>
  );
}

export default GPANotice;
