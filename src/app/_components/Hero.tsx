import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HomeTranslationTypes } from "../translations/en/home";

interface HeroProps {
  isAuthenticated: boolean;
  hero: HomeTranslationTypes["hero"];
}

export default function Hero({ isAuthenticated, hero }: HeroProps) {
  return (
    <div className="text-center mb-16">
      <div className="inline-block p-3 bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl mb-6">
        <div className="text-6xl">🎓</div>
      </div>

      <h1 className="text-5xl mb-6">{hero.title}</h1>

      <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
        {hero.description}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {isAuthenticated ? (
          <Link
            href="/browse"
            className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 justify-center"
          >
            <span>{hero.cta.explore}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        ) : (
          <>
            <Link
              href="/browse"
              className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 justify-center"
            >
              <span>{hero.cta.getStarted}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/sign-in"
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
            >
              {hero.cta.signIn}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
