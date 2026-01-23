import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../_components/alerts";

export default function AIDisclaimer() {
  return (
    <Alert
      className="mb-6 border-amber-500 bg-amber-50"
      role="alert"
      aria-labelledby="disclaimer-title"
    >
      <AlertCircle className="h-5 w-5 text-amber-600" aria-hidden="true" />

      <AlertDescription className="text-amber-900">
        <span id="disclaimer-title" className="font-semibold">
          Important:
        </span>
        These results are AI-generated suggestions based on your inputs. They
        should be used as general guidance only and may not be fully accurate.
        Please consult with academic advisors, visit universities, talk to
        current students, and consider multiple factors before making your final
        decision.
      </AlertDescription>
    </Alert>
  );
}
