"use client";

import { Brain } from "lucide-react";
import { useAIAssistant } from "../_context/AIAssistantContext";
import { MajorDetailsType } from "@/app/translations/en/majorDetails";

interface AIAnalyzeButtonProps {
  major: string;
  t: MajorDetailsType["aiAnalyze"];
}

function AIAnalyzeButton({ major, t }: AIAnalyzeButtonProps) {
  const { sendMessageToAI } = useAIAssistant();

  return (
    <div className="p-6 bg-linear-to-r from-blue-50 to-purple-50">
      <button
        onClick={() => sendMessageToAI(`${t.analyzePrompt} ${major}`)}
        className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium cursor-pointer"
      >
        <Brain className="w-5 h-5" aria-hidden="true" />
        <span>{t.buttonText}</span>
      </button>

      <p className="text-center text-sm text-gray-600 mt-2">{t.description}</p>
    </div>
  );
}

export default AIAnalyzeButton;
