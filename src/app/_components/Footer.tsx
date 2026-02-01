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

const navigationLinks = [
  { label: "Home", icon: Home },
  { label: "All Majors", icon: BookOpen },
  { label: "Tips & Advice", icon: Lightbulb },
  { label: "Compare Majors", icon: GitCompare },
  { label: "About", icon: GraduationCap },
];

const features = [
  "16+ College Majors",
  "Major Requirements Info",
  "AI-Powered Career Assistant",
  "Save & Compare Majors",
  "AI Student Test",
];

// icon is optional — when omitted the label itself is rendered as the visual
const socialLinks: {
  label: string;
  icon?: React.FC<{ className?: string }>;
  href: string;
  ariaLabel: string;
  /** extra className applied to the clickable element */
  className?: string;
}[] = [
  {
    label: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com",
    ariaLabel: "LinkedIn",
  },
  {
    label: "GitHub",
    icon: Github,
    href: "https://github.com",
    ariaLabel: "GitHub",
  },
  {
    label: "MT",
    href: "https://muntadher-ahmed.vercel.app",
    ariaLabel: "Visit my portfolio",
    className: "text-xl",
  },
];

const linkClass =
  "flex items-center gap-2 text-sm text-indigo-200 hover:text-white transition-colors";

export function Footer() {
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
        <p className="text-center text-xl text-indigo-200 mb-8">
          Helping Iraqi students choose the right major
        </p>

        {/* 1-col (centered) → 2-col (sm, centered) → 4-col (md, left-aligned) */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <section
            aria-labelledby="about-heading"
            className="space-y-4 text-center md:text-left"
          >
            <h3
              id="about-heading"
              className="text-lg font-semibold flex md:flex-row flex-col items-center gap-2"
            >
              <GraduationCap className="w-5 h-5" aria-hidden="true" />
              About
            </h3>

            <p className="text-sm text-indigo-200 leading-relaxed">
              Major Compass is where informed futures begin. Empowering students
              to explore and confidently shape their academic path.
            </p>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-indigo-200">Developer</p>
              <p className="text-sm text-indigo-300">Muntadher Ahmed</p>
            </div>
          </section>

          <nav
            aria-labelledby="navigation-heading"
            className="space-y-4 text-center md:text-left"
          >
            <h3 id="navigation-heading" className="text-lg font-semibold">
              Navigation
            </h3>

            <ul className="space-y-2 max-md:flex max-md:flex-col max-md:items-center">
              {navigationLinks.map(({ label, icon: Icon }) => (
                <li key={label}>
                  <button
                    type="button"
                    className={`${linkClass} md:justify-start justify-center`}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    <span>{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Features */}
          <section
            aria-labelledby="features-heading"
            className="space-y-4 text-center md:text-left"
          >
            <h3 id="features-heading" className="text-lg font-semibold">
              Features
            </h3>

            <ul className="space-y-2 text-sm text-indigo-200">
              {features.map((feature) => (
                <li key={feature}>
                  <span aria-hidden="true">• </span>
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          {/* Social */}
          <section
            aria-labelledby="social-heading"
            className="space-y-4 text-center md:text-left"
          >
            <h3 id="social-heading" className="text-lg font-semibold">
              Find Me On
            </h3>

            <ul className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              {socialLinks.map(
                ({ label, icon: Icon, href, ariaLabel, className: extra }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={ariaLabel}
                      className={`text-indigo-200 hover:text-white transition-colors ${extra ?? ""}`}
                    >
                      {Icon ? (
                        <Icon className="w-6 h-6" aria-hidden="true" />
                      ) : (
                        <span aria-hidden="true">{label}</span>
                      )}
                    </Link>
                  </li>
                ),
              )}
            </ul>

            <div className="pt-4">
              <h4 className="text-sm font-semibold mb-2">Contact Me</h4>
              <p className="text-sm text-indigo-200">
                Have questions or feedback? I&apos;d be happy to hear from you!
              </p>
            </div>
          </section>
        </div>

        {/* Bottom */}
        <div className="border-t border-indigo-700 pt-8 text-center space-y-2">
          <p className="text-sm text-indigo-300">
            © {new Date().getFullYear()} Major Compass. All rights reserved.
          </p>

          <p className="text-xs text-indigo-400 max-w-3xl mx-auto">
            Disclaimer: This app is designed for informational purposes only.
            Please verify all admission requirements with official universities.
            The developer is not responsible for decisions made based on this
            information.
          </p>
        </div>
      </div>
    </footer>
  );
}
