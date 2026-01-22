import { BookOpen, MessageCircle, TrendingUp } from "lucide-react";
import FeatureCard from "./FeatureCard";

// Static data
const features = [
  {
    icon: BookOpen,
    title: "Detailed Major Guides",
    description:
      "Comprehensive information about GPA requirements, subjects, skills, pros & cons, and career opportunities",
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: MessageCircle,
    title: "AI Career Assistant",
    description:
      "Get personalized recommendations and instant answers to all your questions about majors and careers",
    iconBgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: TrendingUp,
    title: "Market Demand Insights",
    description:
      "Understand job demand inside and outside Iraq for each major to make informed decisions",
    iconBgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
];

function WhatWeOffer() {
  return (
    <div className="mb-16">
      <h2 className="text-3xl text-center mb-8">What We Offer</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
}
export default WhatWeOffer;
