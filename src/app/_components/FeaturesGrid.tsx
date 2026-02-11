import { aboutTranslation } from "@/app/translations/en/about";
import AboutFeatureCard from "@/app/_components/AboutFeatureCard";

interface FeaturesGridProps {
  features: aboutTranslation["features"];
}

function FeaturesGrid({ features }: FeaturesGridProps) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {features.map((feature, index) => (
        <AboutFeatureCard key={index} {...feature} />
      ))}
    </ul>
  );
}

export default FeaturesGrid;
