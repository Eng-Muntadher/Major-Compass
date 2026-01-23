import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface InfoSectionProps {
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  title: string;
  children: ReactNode;
}

function InfoSection({
  icon: Icon,
  iconBgColor,
  iconColor,
  title,
  children,
}: InfoSectionProps) {
  return (
    <div className="bg-white rounded-xl p-8 border border-gray-200 mb-6">
      <div className="flex items-start gap-4 mb-4">
        <div
          className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center shrink-0`}
        >
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <div>
          <h2 className="text-2xl mb-3 font-semibold">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
