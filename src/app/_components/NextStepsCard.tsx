import { useRouter } from "next/navigation";
import Button from "../_components/Button";
import Card from "../_components/Card";

interface NextStepsCardProps {
  onRetakeTest?: () => void;
}

export default function NextStepsCard({ onRetakeTest }: NextStepsCardProps) {
  const router = useRouter();
  return (
    <section aria-labelledby="next-steps-heading" className="mb-6">
      <Card className="p-6" role="complementary">
        <h2 id="next-steps-heading" className="text-2xl mb-4">
          🚀 What&apos;s Next?
        </h2>

        <ul className="space-y-3 mb-6 list-disc ml-6">
          <li>Explore our comprehensive database of college majors</li>
          <li>
            Read detailed information about each major including career
            prospects
          </li>
          <li>Compare different majors side-by-side</li>
          <li>Save your favorite majors for future reference</li>
          <li>Consult with our AI assistant for more personalized guidance</li>
        </ul>

        <div
          className="flex flex-col sm:flex-row gap-3"
          aria-label="Next steps actions"
        >
          <Button
            onClick={() => router.push("/browse")}
            className="flex-1 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6"
          >
            Explore All Majors
          </Button>
          <Button
            onClick={onRetakeTest}
            variant="outline"
            className="flex-1 py-6"
          >
            Retake Test
          </Button>
        </div>
      </Card>
    </section>
  );
}
