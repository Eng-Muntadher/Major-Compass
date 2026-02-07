import { HomeTranslationTypes } from "../translations/en/home";
import FeatureCard from "./FeatureCard";

interface WhatWeOfferProps {
  features: HomeTranslationTypes["features"];
  title: string;
}

export default function WhatWeOffer({ features, title }: WhatWeOfferProps) {
  return (
    <div className="mb-16">
      <h2 className="text-3xl text-center mb-8">{title}</h2>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </ul>
    </div>
  );
}
