import InfoBadge from "./InfoBadge";

// Static data
const badges = [
  { emoji: "💡", text: "Ask about any major" },
  { emoji: "🎯", text: "Get personalized advice" },
  { emoji: "📊", text: "Compare different paths" },
];

function TipsCTASection() {
  return (
    <div className="mt-8 bg-linear-to-br from-blue-50 to-purple-50 rounded-xl p-8 text-center border border-blue-100">
      <h3 className="text-xl mb-2">Still Have Questions?</h3>
      <p className="text-gray-600 mb-4">
        Use our AI Assistant to get personalized guidance for your specific
        situation
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        {badges.map((badge, index) => (
          <InfoBadge key={index} emoji={badge.emoji} text={badge.text} />
        ))}
      </div>
    </div>
  );
}

export default TipsCTASection;
