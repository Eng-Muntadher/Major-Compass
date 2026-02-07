import { aboutTranslation } from "../translations/en/about";
import AboutFeatureCard from "./AboutFeatureCard";

interface FeaturesGridProps {
  features: aboutTranslation["features"];
}

function FeaturesGrid({ features }: FeaturesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {features.map((feature, index) => (
        <AboutFeatureCard key={index} {...feature} />
      ))}
    </div>
  );
}

export default FeaturesGrid;
