import FeatureCard from "./FeatureCard";

// Static data
const features = [
  {
    emoji: "📚",
    title: "Comprehensive Major Information",
    description:
      "16+ detailed major profiles across 8 categories with GPA requirements, skills needed, and career opportunities",
    gradientFrom: "from-blue-50",
    gradientTo: "to-purple-50",
    borderColor: "border-blue-100",
  },
  {
    emoji: "🤖",
    title: "AI-Powered Guidance",
    description:
      "Smart assistant that analyzes majors, provides personalized recommendations, and answers your questions",
    gradientFrom: "from-purple-50",
    gradientTo: "to-pink-50",
    borderColor: "border-purple-100",
  },
  {
    emoji: "💡",
    title: "Expert Tips & Advice",
    description:
      "Practical guidance on choosing the right major, avoiding common mistakes, and preparing for college",
    gradientFrom: "from-green-50",
    gradientTo: "to-blue-50",
    borderColor: "border-green-100",
  },
  {
    emoji: "🌍",
    title: "Bilingual Support",
    description:
      "Full support for both English and Arabic to serve all Iraqi students",
    gradientFrom: "from-yellow-50",
    gradientTo: "to-orange-50",
    borderColor: "border-yellow-100",
  },
];

function FeaturesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  );
}

export default FeaturesGrid;
