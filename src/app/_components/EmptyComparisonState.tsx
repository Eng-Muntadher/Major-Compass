import { ArrowLeftRight } from "lucide-react";

export default function EmptyComparisonState() {
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
      <h2 className="text-xl mb-2 font-semibold">
        Select Two Majors to Compare
      </h2>
      <p className="text-gray-600">
        Use the dropdowns above to choose majors for detailed comparison
      </p>
    </div>
  );
}
