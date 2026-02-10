"use client";

import { usePathname } from "next/navigation";

function LoaderComponent() {
  const pathname = usePathname();

  // Detect if the URL starts with /ar
  const isAr = pathname?.startsWith("/ar");
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-white/90 backdrop-blur-sm"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div className="w-20 h-20 rounded-full border-[6px] border-blue-100/80 shadow-[0_0_20px_rgba(37,99,235,0.1)]"></div>

        {/* Inner Gradient Spinner */}
        <div
          className={`absolute w-20 h-20 rounded-full border-[6px] border-transparent border-t-blue-600 border-l-blue-400 
          ${isAr ? "animate-[spin_1.2s_linear_infinite_reverse]" : "animate-spin"}`}
        ></div>

        {/* Center Pulse Dot */}
        <div className="absolute w-3 h-3 bg-blue-600 rounded-full animate-ping"></div>
      </div>

      <div className="flex flex-col items-center gap-3 mt-8">
        <p className="text-blue-600 text-xl font-bold tracking-tight animate-pulse">
          {isAr ? "جاري التحميل..." : "Loading..."}
        </p>

        {/* Progress Bar (Using standard Tailwind animate-pulse or a custom class) */}
        <div className="h-1.5 w-28 bg-blue-100 rounded-full overflow-hidden mb-44">
          <div className="h-full bg-blue-600 w-full rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default LoaderComponent;
