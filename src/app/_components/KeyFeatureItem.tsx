import { LucideIcon } from "lucide-react";

interface KeyFeatureItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBgColor: string;
  iconColor: string;
}

function KeyFeatureItem({
  icon: Icon,
  title,
  description,
  iconBgColor,
  iconColor,
}: KeyFeatureItemProps) {
  return (
    <li className="flex gap-4">
      <div
        className={`w-10 h-10 ${iconBgColor} rounded-lg flex items-center justify-center shrink-0`}
      >
        <Icon className={`w-5 h-5 ${iconColor}`} aria-hidden="true" />
      </div>
      <div>
        <h3 className="text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </li>
  );
}
export default KeyFeatureItem;
