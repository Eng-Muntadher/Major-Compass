import { useRouter } from "next/navigation";
import Button from "../_components/Button";
import Card from "../_components/Card";

interface NextStepsContent {
  heading: string;
  steps: readonly string[];
  buttons: {
    explore: string;
    retake: string;
  };
}

interface NextStepsCardProps {
  content: NextStepsContent;
  onRetakeTest?: () => void;
}

export default function NextStepsCard({
  content,
  onRetakeTest,
}: NextStepsCardProps) {
  const router = useRouter();

  return (
    <section aria-labelledby="next-steps-heading" className="mb-6">
      <Card className="p-6" role="complementary">
        <h2 id="next-steps-heading" className="text-2xl mb-4">
          {content.heading}
        </h2>

        <ul className="space-y-3 mb-6 list-disc ml-6">
          {content.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>

        <div
          className="flex flex-col sm:flex-row gap-3"
          aria-label="Next steps actions"
        >
          <Button
            onClick={() => router.push("/browse")}
            className="flex-1 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6"
          >
            {content.buttons.explore}
          </Button>

          <Button
            onClick={onRetakeTest}
            variant="outline"
            className="flex-1 py-6"
          >
            {content.buttons.retake}
          </Button>
        </div>
      </Card>
    </section>
  );
}
