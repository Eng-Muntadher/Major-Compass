"use client";

import { Brain } from "lucide-react";
import { useAIAssistant } from "../_context/AIAssistantContext";
import { MajorDetailsType } from "@/app/translations/en/majorDetails";
import { Button } from "./Button";

interface AIAnalyzeButtonProps {
  major: string;
  t: MajorDetailsType["aiAnalyze"];
}

function AIAnalyzeButton({ major, t }: AIAnalyzeButtonProps) {
  const { sendMessageToAI } = useAIAssistant();

  return (
    <div className="p-6 bg-linear-to-r from-blue-50 to-purple-50">
      <Button
        leftIcon={<Brain className="w-5 h-5" aria-hidden="true" />}
        onClick={() => sendMessageToAI(`${t.analyzePrompt} ${major}`)}
        className="w-full"
      >
        <span>{t.buttonText}</span>
      </Button>

      <p className="text-center text-sm text-gray-600 mt-2">{t.description}</p>
    </div>
  );
}

export default AIAnalyzeButton;
