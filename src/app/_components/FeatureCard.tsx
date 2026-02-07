import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBgColor: string;
  iconColor: string;
}

// Feature Card Component
function FeatureCard({
  icon: Icon,
  title,
  description,
  iconBgColor,
  iconColor,
}: FeatureCardProps) {
  return (
    <li className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
      <div
        className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center mb-4`}
      >
        <Icon className={`w-6 h-6 ${iconColor}`} aria-hidden="true" />
      </div>
      <h3 className="text-xl mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </li>
  );
}

export default FeatureCard;
