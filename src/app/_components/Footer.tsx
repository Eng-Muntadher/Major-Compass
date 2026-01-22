import {
  GraduationCap,
  Mail,
  Home,
  BookOpen,
  Lightbulb,
  GitCompare,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-linear-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section - Tagline */}
        <div className="text-center mb-8">
          <p className="text-xl text-indigo-200">
            Helping Iraqi students choose the right major
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About / Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              About
            </h3>
            <p className="text-sm text-indigo-200 leading-relaxed">
              College Guide is a comprehensive platform designed to help Iraqi
              6th-grade students explore college majors and make informed
              decisions about their future.
            </p>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-indigo-200">
                Developer
              </h4>

              <p className="text-sm text-indigo-300">
                Built with ❤️ for Iraqi students
              </p>
              <a
                href="mailto:collegeguide.iraq@gmail.com"
                className="flex items-center gap-2 text-sm text-indigo-200 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                collegeguide.iraq@gmail.com
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <button className="flex items-center gap-2 text-sm text-indigo-200 hover:text-white transition-colors">
                  <Home className="w-4 h-4" />
                  Home
                </button>
              </li>
              <li>
                <button className="flex items-center gap-2 text-sm text-indigo-200 hover:text-white transition-colors">
                  <BookOpen className="w-4 h-4" />
                  All Majors
                </button>
              </li>
              <li>
                <button className="flex items-center gap-2 text-sm text-indigo-200 hover:text-white transition-colors">
                  <Lightbulb className="w-4 h-4" />
                  Tips & Advice
                </button>
              </li>
              <li>
                <button className="flex items-center gap-2 text-sm text-indigo-200 hover:text-white transition-colors">
                  <GitCompare className="w-4 h-4" />
                  Compare Majors
                </button>
              </li>
              <li>
                <button className="flex items-center gap-2 text-sm text-indigo-200 hover:text-white transition-colors">
                  <GraduationCap className="w-4 h-4" />
                  About
                </button>
              </li>
              <li>
                <button className="flex items-center gap-2 text-sm text-indigo-200 hover:text-white transition-colors">
                  <Globe className="w-4 h-4" />
                  English
                </button>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Features</h3>
            <ul className="space-y-2 text-sm text-indigo-200">
              <li>• 16+ College Majors</li>
              <li>• Comprehensive Requirements Info</li>
              <li>• AI-Powered Career Assistant</li>
              <li>• Major Comparison Tools</li>
              <li>• Market Demand Insights</li>
              <li>• Bilingual Support</li>
              <li>• Expert Tips & Advice</li>
              <li>• Save & Compare Majors</li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-200 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-200 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-200 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-200 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-200 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
            <div className="pt-4">
              <h4 className="text-sm font-semibold mb-2">Contact Us</h4>
              <p className="text-sm text-indigo-200">
                Have questions or feedback? We&apos;d love to hear from you!
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright & Disclaimer */}
        <div className="border-t border-indigo-700 pt-8 space-y-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-indigo-300">
              © {new Date().getFullYear()} College Guide. All rights reserved.
            </p>

            <p className="text-xs text-indigo-400 max-w-3xl mx-auto">
              Disclaimer: This app is designed for informational and educational
              purposes only. Please verify all admission requirements and
              information with official universities. Admission requirements may
              vary by university and year. We are not responsible for decisions
              made based on this information.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
