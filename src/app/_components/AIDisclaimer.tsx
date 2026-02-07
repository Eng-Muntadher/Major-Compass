import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../_components/alerts";

interface AIDisclaimerContent {
  importantLabel: string;
  message: string; // The full disclaimer text
}

interface AIDisclaimerProps {
  content: AIDisclaimerContent;
}

export default function AIDisclaimer({ content }: AIDisclaimerProps) {
  return (
    <Alert
      className="mb-6 border-amber-500 bg-amber-50"
      role="alert"
      aria-labelledby="disclaimer-title"
    >
      <AlertCircle className="h-5 w-5 text-amber-600" aria-hidden="true" />

      <AlertDescription className="text-amber-900">
        <span id="disclaimer-title" className="font-semibold">
          {content.importantLabel}
        </span>{" "}
        {content.message}
      </AlertDescription>
    </Alert>
  );
}
