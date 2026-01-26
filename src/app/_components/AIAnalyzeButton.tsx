import { Brain } from "lucide-react";

function AIAnalyzeButton() {
  return (
    <div className="p-6 bg-linear-to-r from-blue-50 to-purple-50">
      <button className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium">
        <Brain className="w-5 h-5" aria-hidden="true" />
        <span>Analyze This Major with AI</span>
      </button>
      <p className="text-center text-sm text-gray-600 mt-2">
        Get personalized recommendations and see if you&apos;re a good fit
      </p>
    </div>
  );
}

export default AIAnalyzeButton;
