import ResultsHeader from "./ResultsHeader";
import AIResponseCard from "./AIResponseCard";
import AIDisclaimer from "./AIDisclaimer";
import NextStepsCard from "./NextStepsCard";
import { TestTranslationTypes } from "../translations/en/studentTest";

interface TestResultsViewProps {
  loading: boolean;
  response: string | null;
  onBack?: () => void;
  onRetakeTest?: () => void;
  result: TestTranslationTypes["result"];
}

export default function TestResultsView({
  loading,
  response,
  onBack,
  onRetakeTest,
  result,
}: TestResultsViewProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <ResultsHeader header={result.header} onBack={onBack} />

      <AIResponseCard
        content={result.aiBox}
        loading={loading}
        response={response}
      />

      {!loading && (
        <>
          <AIDisclaimer content={result.aiDisclaimer} />
          <NextStepsCard
            content={result.nextSteps}
            onRetakeTest={onRetakeTest}
          />
        </>
      )}
    </div>
  );
}
