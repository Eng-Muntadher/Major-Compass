"use client";

import { useAIAssistant } from "../_context/AIAssistantContext";

export default function CompareCTABanner() {
  const { setIsAIOpen } = useAIAssistant();

  return (
    <aside
      className="mt-8 bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100"
      aria-labelledby="compare-cta-heading"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h2 id="compare-cta-heading" className="text-lg font-semibold mb-1">
            Ready to Compare Your Options?
          </h2>
          <p className="text-sm text-gray-600">
            Use AI to analyze and compare your saved majors
          </p>
        </div>
        <button
          onClick={() => setIsAIOpen(true)}
          aria-label="Compare saved majors with AI"
          className="px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
        >
          <span className="text-xl" aria-hidden="true">
            🤖
          </span>
          <span>Compare with AI</span>
        </button>
      </div>
    </aside>
  );
}
