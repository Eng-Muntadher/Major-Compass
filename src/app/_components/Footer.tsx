import {
  GraduationCap,
  Home,
  BookOpen,
  Lightbulb,
  GitCompare,
  Linkedin,
  Github,
} from "lucide-react";
import Link from "next/link";
import { getLocaleFromParams } from "../_utils/lang";
import { getTranslations } from "../translations";

type FooterProps = {
  lang: "en" | "ar";
};

const NAV_ICONS = {
  home: Home,
  majors: BookOpen,
  tips: Lightbulb,
  compare: GitCompare,
  about: GraduationCap,
};

const SOCIAL_ICONS = {
  linkedin: Linkedin,
  github: Github,
};

const linkClass =
  "flex items-center gap-2 text-sm text-indigo-200 hover:text-white transition-colors";

export function Footer({ lang }: FooterProps) {
  const locale = getLocaleFromParams(lang);
  const t = getTranslations(locale).footer;

  const isEnglish = locale === "en";

  return (
    <footer
      className="bg-linear-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white mt-16"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Tagline */}
        <p className="text-center text-xl text-indigo-200 mb-8">{t.tagline}</p>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <section className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold flex md:flex-row flex-col items-center gap-2">
              <GraduationCap className="w-5 h-5" aria-hidden="true" />
              {t.about.title}
            </h3>

            <p
              className={`text-sm text-indigo-200 leading-relaxed ${isEnglish || "md:text-right"}`}
            >
              {t.about.description}
            </p>

            <div className={`space-y-2 ${isEnglish || "md:text-right"}`}>
              <p className="text-sm font-semibold text-indigo-200">
                {t.about.developerLabel}
              </p>
              <p className="text-sm text-indigo-300">{t.about.developerName}</p>
            </div>
          </section>

          {/* Navigation */}
          <nav className="space-y-4 text-center md:text-left">
            <h3
              className={`text-lg font-semibold ${isEnglish || "md:text-right"}`}
            >
              {t.navigation.title}
            </h3>

            <ul className="space-y-2 max-md:flex max-md:flex-col max-md:items-center">
              {t.navigation.links.map((link) => {
                const Icon = NAV_ICONS[link.key as keyof typeof NAV_ICONS];
                return (
                  <li key={link.key}>
                    <Link
                      href={`/${link.href}`}
                      className={`${linkClass} md:justify-start justify-center`}
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Features */}
          <section className="space-y-4 text-center md:text-left">
            <h3
              className={`text-lg font-semibold ${isEnglish || "md:text-right"}`}
            >
              {t.features.title}
            </h3>

            <ul className="space-y-2 text-sm text-indigo-200">
              {t.features.items.map((feature) => (
                <li key={feature} className={`${isEnglish || "md:text-right"}`}>
                  <span aria-hidden="true">• </span>
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          {/* Social */}
          <section className="space-y-4 text-center md:text-left">
            <h3
              className={`text-lg font-semibold ${isEnglish || "md:text-right"}`}
            >
              {t.social.title}
            </h3>

            <ul className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              {t.social.links.map((link) => {
                const Icon = link.iconKey ? SOCIAL_ICONS[link.iconKey] : null;

                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.ariaLabel}
                      className={`text-indigo-200 hover:text-white transition-colors ${
                        link.className ?? ""
                      }`}
                    >
                      {Icon ? (
                        <Icon className="w-6 h-6" aria-hidden="true" />
                      ) : (
                        <span aria-hidden="true">{link.label}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className={`pt-4 ${isEnglish || "md:text-right"}`}>
              <h4 className="text-sm font-semibold mb-2">{t.contact.title}</h4>
              <p className="text-sm text-indigo-200">{t.contact.description}</p>
            </div>
          </section>
        </div>

        {/* Bottom */}
        <div className="border-t border-indigo-700 pt-8 text-center space-y-2">
          <p className="text-sm text-indigo-300">
            © {new Date().getFullYear()} {t.bottom.copyright}
          </p>

          <p className="text-xs text-indigo-400 max-w-3xl mx-auto">
            {t.bottom.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
