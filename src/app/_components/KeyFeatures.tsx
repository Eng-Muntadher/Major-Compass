import { HomeTranslationTypes } from "../translations/en/home";
import KeyFeatureItem from "./KeyFeatureItem";

interface KeyFeaturesProps {
  keyFeatures: HomeTranslationTypes["keyFeatures"];
  title: string;
}

export default function KeyFeatures({ keyFeatures, title }: KeyFeaturesProps) {
  return (
    <div className="mb-16">
      <h2 className="text-3xl text-center mb-8">{title}</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {keyFeatures.map((feature, index) => (
          <KeyFeatureItem key={index} {...feature} />
        ))}
      </ul>
    </div>
  );
}
