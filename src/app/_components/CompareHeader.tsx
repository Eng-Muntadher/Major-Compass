import { ArrowLeftRight } from "lucide-react";

export default function CompareHeader() {
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
          <h1 className="text-3xl">Compare Majors</h1>
          <p className="text-gray-600">
            Select two majors to compare side-by-side
          </p>
        </div>
      </div>
    </header>
  );
}
