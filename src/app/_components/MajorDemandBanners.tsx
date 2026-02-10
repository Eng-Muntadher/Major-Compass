import { TrendingUp, Globe } from "lucide-react";
import { MajorDetailsType } from "@/app/translations/en/majorDetails";

interface DemandBannersProps {
  demandInIraq?: "High" | "Medium" | "Low" | null;
  demandOutsideIraq?: "High" | "Medium" | "Low" | null;
  t: MajorDetailsType["demandBanners"];
}

const demandStyles = {
  High: {
    bg: "bg-green-50",
    border: "border-green-300",
    icon: "text-green-600",
    text: "text-green-700",
  },
  Medium: {
    bg: "bg-yellow-50",
    border: "border-yellow-300",
    icon: "text-yellow-600",
    text: "text-yellow-700",
  },
  Low: {
    bg: "bg-red-50",
    border: "border-red-300",
    icon: "text-red-600",
    text: "text-red-700",
  },
};

function MajorDemandBanners({
  demandInIraq,
  demandOutsideIraq,
  t,
}: DemandBannersProps) {
  return (
    <section
      className="grid md:grid-cols-2 gap-4 mb-6"
      aria-labelledby="demand-heading"
    >
      <h2 id="demand-heading" className="sr-only">
        {t.heading}
      </h2>

      {/* demand in Iraq section */}
      {demandInIraq && (
        <div
          className={`rounded-xl p-4 border-2 ${demandStyles[demandInIraq].bg} ${demandStyles[demandInIraq].border}`}
          role="status"
          aria-label={`${t.insideIraq.ariaLabel}: ${t.levels[demandInIraq]}`}
        >
          <div className="flex items-center gap-3">
            <TrendingUp
              className={`w-6 h-6 ${demandStyles[demandInIraq].icon}`}
              aria-hidden="true"
            />
            <div className="flex-1">
              <p className="text-xs text-gray-600 mb-1">{t.insideIraq.label}</p>
              <p
                className={`text-lg font-semibold ${demandStyles[demandInIraq].text}`}
              >
                {t.levels[demandInIraq]}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* demand outside Iraq section */}
      {demandOutsideIraq && (
        <div
          className={`rounded-xl p-4 border-2 ${demandStyles[demandOutsideIraq].bg} ${demandStyles[demandOutsideIraq].border}`}
          role="status"
          aria-label={`${t.outsideIraq.ariaLabel}: ${t.levels[demandOutsideIraq]}`}
        >
          <div className="flex items-center gap-3">
            <Globe
              className={`w-6 h-6 ${demandStyles[demandOutsideIraq].icon}`}
              aria-hidden="true"
            />
            <div className="flex-1">
              <p className="text-xs text-gray-600 mb-1">
                {t.outsideIraq.label}
              </p>
              <p
                className={`text-lg font-semibold ${demandStyles[demandOutsideIraq].text}`}
              >
                {t.levels[demandOutsideIraq]}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default MajorDemandBanners;
