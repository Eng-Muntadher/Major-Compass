import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HomeTranslationTypes } from "../translations/en/home";

interface CTASectionProps {
  isAuthenticated: boolean;
  cta: HomeTranslationTypes["cta"];
}

function CTASection({ isAuthenticated, cta }: CTASectionProps) {
  return (
    <section
      aria-labelledby="next-steps-heading"
      className="bg-white rounded-2xl p-12 border border-gray-200 text-center"
    >
      <h2 id="next-steps-heading" className="text-3xl mb-4">
        {cta.title}
      </h2>

      <p className="text-gray-600 mb-8 max-w-2xl mx-auto">{cta.description}</p>

      {isAuthenticated ? (
        <Link
          href="/student-test"
          className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all inline-flex items-center gap-2"
        >
          <span>{cta.takeTest}</span>
          <ArrowRight className="w-5 h-5" aria-hidden="true" />
        </Link>
      ) : (
        <Link
          href="/sign-up"
          className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all inline-flex items-center gap-2"
        >
          <span>{cta.signUp}</span>
          <ArrowRight className="w-5 h-5" aria-hidden="true" />
        </Link>
      )}
    </section>
  );
}

export default CTASection;
