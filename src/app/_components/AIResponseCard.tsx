import ReactMarkdown from "react-markdown";
import { Bot, Loader2 } from "lucide-react";
import Card from "../_components/Card";

interface AIResponseCardContent {
  title: string;
  loadingText: string;
  loadedText: string;
  processingText: string;
}

interface AIResponseCardProps {
  loading: boolean;
  response: string | null;
  content: AIResponseCardContent;
}

export default function AIResponseCard({
  loading,
  response,
  content,
}: AIResponseCardProps) {
  return (
    <section aria-labelledby="ai-advisor-title" className="mb-6">
      <Card className="p-6 md:p-8" role="region" aria-label={content.title}>
        <header className="flex items-start gap-4 mb-6">
          <div
            className="w-12 h-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <Bot className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h2 id="ai-advisor-title" className="text-xl font-semibold mb-1">
              {content.title}
            </h2>
            <p className="text-sm text-gray-600">
              {loading ? content.loadingText : content.loadedText}
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
              {content.processingText}
            </p>
          </div>
        ) : (
          <div className="whitespace-pre-line max-w-none">
            {<ReactMarkdown>{response}</ReactMarkdown>}
          </div>
        )}
      </Card>
    </section>
  );
}
