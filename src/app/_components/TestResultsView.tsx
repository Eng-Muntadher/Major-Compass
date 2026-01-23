import ResultsHeader from "./ResultsHeader";
import AIResponseCard from "./AIResponseCard";
import AIDisclaimer from "./AIDisclaimer";
import NextStepsCard from "./NextStepsCard";

interface TestResultsViewProps {
  loading: boolean;
  response: string;
  onBack?: () => void;
  onExploreMajors?: () => void;
  onRetakeTest?: () => void;
}

export default function TestResultsView({
  loading,
  response,
  onBack,
  onExploreMajors,
  onRetakeTest,
}: TestResultsViewProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <ResultsHeader onBack={onBack} />

      <AIResponseCard loading={loading} response={response} />

      {!loading && (
        <>
          <AIDisclaimer />
          <NextStepsCard
            onExploreMajors={onExploreMajors}
            onRetakeTest={onRetakeTest}
          />
        </>
      )}
    </div>
  );
}
