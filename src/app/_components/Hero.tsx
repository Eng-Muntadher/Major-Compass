import { ArrowRight } from "lucide-react";
import { HomeTranslationTypes } from "../translations/en/home";
import { Button } from "./Button";

interface HeroProps {
  isAuthenticated: boolean;
  hero: HomeTranslationTypes["hero"];
  lang: "en" | "ar";
}

export default function Hero({ isAuthenticated, hero, lang }: HeroProps) {
  return (
    <div className="text-center mb-16">
      {/* Logo */}
      <div className="inline-block p-3 bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl mb-6">
        <div className="text-4xl sm:text-6xl" aria-hidden="true">
          🎓
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl mb-6 px-4">
        {hero.title}
      </h1>

      {/* Description */}
      <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto px-4">
        {hero.description}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
        {isAuthenticated ? (
          <Button
            href={`/${lang}/browse`}
            rightIcon={<ArrowRight className="w-5 h-5" aria-hidden="true" />}
            size="lg"
          >
            <span>{hero.cta.explore}</span>
          </Button>
        ) : (
          <>
            <Button
              href={`/${lang}/browse`}
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" aria-hidden="true" />}
              className="font-normal"
            >
              <span>{hero.cta.getStarted}</span>
            </Button>

            <Button
              href={`/${lang}/sign-in`}
              variant="outline"
              size="lg"
              className="font-normal"
            >
              {hero.cta.signIn}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
