interface FeatureCardProps {
  emoji: string;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
}

function AboutFeatureCard({
  emoji,
  title,
  description,
  gradientFrom,
  gradientTo,
  borderColor,
}: FeatureCardProps) {
  return (
    <div
      className={`bg-linear-to-br ${gradientFrom} ${gradientTo} rounded-xl p-6 border ${borderColor}`}
    >
      <div className="text-3xl mb-3">{emoji}</div>
      <h3 className="text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-700">{description}</p>
    </div>
  );
}

export default AboutFeatureCard;
