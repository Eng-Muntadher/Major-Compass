import { ArrowLeft } from "lucide-react";
import { Button } from "../_components/Button";

interface ResultsHeaderProps {
  onBack?: () => void;
  header: {
    backLabel: string; // "Back to Test"
    title: string; // "Your Personalized Assessment"
    description: string; // "AI-powered analysis based on your profile and preferences"
  };
}

export default function ResultsHeader({ onBack, header }: ResultsHeaderProps) {
  return (
    <section aria-labelledby="results-title" className="mb-6">
      <Button
        variant="ghost"
        className="mb-4"
        leftIcon={<ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />}
        onClick={onBack}
        aria-label={header.backLabel}
      >
        {header.backLabel}
      </Button>

      <h1
        id="results-title"
        className="text-2xl sm:text-3xl md:text-4xl mb-2 font-semibold"
      >
        {header.title}
      </h1>

      <p className="text-gray-600 text-sm sm:text-base">{header.description}</p>
    </section>
  );
}
