import { ArrowRight } from "lucide-react";
import { HomeTranslationTypes } from "../translations/en/home";
import { Button } from "./Button";

interface CTASectionProps {
  isAuthenticated: boolean;
  cta: HomeTranslationTypes["cta"];
  lang: "en" | "ar";
}

function CTASection({ isAuthenticated, cta, lang }: CTASectionProps) {
  return (
    <section
      aria-labelledby="next-steps-heading"
      className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 border border-gray-200 text-center"
    >
      <h2 id="next-steps-heading" className="text-2xl sm:text-3xl mb-4">
        {cta.title}
      </h2>

      <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        {cta.description}
      </p>

      {isAuthenticated ? (
        <Button
          href={`/${lang}/student-test`}
          size="lg"
          rightIcon={<ArrowRight className="w-5 h-5" />}
        >
          <span>{cta.takeTest}</span>
        </Button>
      ) : (
        <Button
          href={`/${lang}/sign-up`}
          size="lg"
          rightIcon={<ArrowRight className="w-5 h-5" />}
        >
          <span>{cta.signUp}</span>
        </Button>
      )}
    </section>
  );
}

export default CTASection;
