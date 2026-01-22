import { Bookmark, MessageCircle, Search, Users } from "lucide-react";
import KeyFeatureItem from "./KeyFeatureItem";

// Static data
const features = [
  {
    icon: Search,
    title: "Smart Search & Filters",
    description:
      "Find majors by category, difficulty, or GPA requirements with our intuitive search system",
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Bookmark,
    title: "Save & Compare",
    description:
      "Bookmark your favorite majors and compare them side-by-side to find the best fit",
    iconBgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: MessageCircle,
    title: "AI-Powered Analysis",
    description:
      "Use our intelligent assistant to analyze majors and get personalized career guidance",
    iconBgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: Users,
    title: "Compare Majors",
    description:
      "Side-by-side comparison of majors with detailed information on requirements and opportunities",
    iconBgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
];

function KeyFeatures() {
  return (
    <div className="mb-16">
      <h2 className="text-3xl text-center mb-8">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <KeyFeatureItem key={index} {...feature} />
        ))}
      </div>
    </div>
  );
}

export default KeyFeatures;
