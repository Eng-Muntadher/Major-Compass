import { Bot, Loader2 } from "lucide-react";
import Card from "../_components/Card";

interface AIResponseCardProps {
  loading: boolean;
  response: string;
}

const formatResponse = (text: string) => {
  const lines = text.split("\n");
  return lines.map((line, index) => {
    if (line.startsWith("## ")) {
      return (
        <h2 key={index} className="text-2xl font-semibold mt-6 mb-3">
          {line.substring(3)}
        </h2>
      );
    }
    if (line.includes("**")) {
      const parts = line.split("**");
      return (
        <p key={index} className="mb-2">
          {parts.map((part, i) =>
            i % 2 === 1 ? <strong key={i}>{part}</strong> : part,
          )}
        </p>
      );
    }
    if (line.startsWith("• ")) {
      return (
        <li key={index} className="ml-6 mb-2">
          {line.substring(2)}
        </li>
      );
    }
    if (line.trim()) {
      return (
        <p key={index} className="mb-2">
          {line}
        </p>
      );
    }
    return <br key={index} />;
  });
};

export default function AIResponseCard({
  loading,
  response,
}: AIResponseCardProps) {
  return (
    <section aria-labelledby="ai-advisor-title" className="mb-6">
      <Card
        className="p-6 md:p-8"
        role="region"
        aria-label="AI Career Advisor Response"
      >
        <header className="flex items-start gap-4 mb-6">
          <div
            className="w-12 h-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <Bot className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h2 id="ai-advisor-title" className="text-xl font-semibold mb-1">
              AI Career Advisor
            </h2>
            <p className="text-sm text-gray-600">
              {loading
                ? "Analyzing your profile and generating recommendations..."
                : "Here are your personalized recommendations"}
            </p>
          </div>
        </header>

        {loading ? (
          <div
            className="flex flex-col items-center justify-center py-12"
            role="status"
            aria-live="polite"
          >
            <Loader2
              className="w-12 h-12 text-blue-600 animate-spin mb-4"
              aria-hidden="true"
            />
            <p className="text-gray-600 text-center">
              Processing your information and generating personalized
              recommendations...
            </p>
          </div>
        ) : (
          <div className="prose prose-blue max-w-none">
            {formatResponse(response)}
          </div>
        )}
      </Card>
    </section>
  );
}
