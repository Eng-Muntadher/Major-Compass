import { ArrowLeft } from "lucide-react";
import Button from "../_components/Button";

interface ResultsHeaderProps {
  onBack?: () => void;
}

export default function ResultsHeader({ onBack }: ResultsHeaderProps) {
  return (
    <section aria-labelledby="results-title" className="mb-6">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={onBack}
        aria-label="Go back to test"
      >
        <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
        Back to Test
      </Button>

      <h1 id="results-title" className="text-4xl mb-2">
        Your Personalized Assessment
      </h1>

      <p className="text-gray-600">
        AI-powered analysis based on your profile and preferences
      </p>
    </section>
  );
}
