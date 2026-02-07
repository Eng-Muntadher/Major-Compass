import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon?: LucideIcon;
  emoji?: string;
  value: number | string;
  label: string;
  bgColor: string;
  iconColor?: string;
}

export default function StatCard({
  icon: Icon,
  emoji,
  value,
  label,
  bgColor,
  iconColor,
}: StatCardProps) {
  return (
    <li className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-2">
        <div
          className={`w-10 h-10 ${bgColor} rounded-lg flex items-center justify-center`}
        >
          {Icon ? (
            <Icon className={`w-5 h-5  ${iconColor}`} aria-hidden="true" />
          ) : (
            <span className="text-xl" aria-hidden="true">
              {emoji}
            </span>
          )}
        </div>
        <div>
          <p className="text-2xl font-semibold">{value}</p>
          <p className="text-sm text-gray-600">{label}</p>
        </div>
      </div>
    </li>
  );
}
