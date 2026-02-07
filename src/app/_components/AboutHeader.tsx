import { Heart } from "lucide-react";
import { aboutTranslation } from "../translations/en/about";

interface AboutHeaderProps {
  header: aboutTranslation["header"];
}

function AboutHeader({ header }: AboutHeaderProps) {
  return (
    <div className="mb-12 text-center">
      <div className="w-16 h-16 bg-linear-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <Heart className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-4xl mb-4">{header.title}</h1>
      <p className="text-xl text-gray-600">{header.subtitle}</p>
    </div>
  );
}

export default AboutHeader;
