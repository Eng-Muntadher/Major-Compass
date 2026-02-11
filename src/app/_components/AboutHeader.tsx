import { Heart } from "lucide-react";
import { aboutTranslation } from "@/app/translations/en/about";

interface AboutHeaderProps {
  header: aboutTranslation["header"];
}

function AboutHeader({ header }: AboutHeaderProps) {
  return (
    <div className="mb-12 text-center px-4">
      {/* Logo */}
      <div
        aria-hidden="true"
        className="w-14 h-14 sm:w-16 sm:h-16 bg-linear-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <Heart
          className="w-7 h-7 sm:w-8 sm:h-8 text-white"
          aria-hidden="true"
        />
      </div>

      {/* About Title */}
      <h1 className="text-3xl sm:text-4xl mb-4">{header.title}</h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-600">
        {header.subtitle}
      </p>
    </div>
  );
}

export default AboutHeader;
