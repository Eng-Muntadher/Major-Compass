import { ArrowLeft } from "lucide-react";
import Button from "../_components/Button";

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
        onClick={onBack}
        aria-label={header.backLabel}
      >
        <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
        {header.backLabel}
      </Button>

      <h1 id="results-title" className="text-4xl mb-2">
        {header.title}
      </h1>

      <p className="text-gray-600">{header.description}</p>
    </section>
  );
}
