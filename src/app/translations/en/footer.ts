type SocialLink = {
  label: string;
  iconKey?: "linkedin" | "github";
  href: string;
  ariaLabel: string;
  className?: string; // optional
};

export type FooterTranslations = {
  tagline: string;
  about: {
    title: string;
    description: string;
    developerLabel: string;
    developerName: string;
  };
  navigation: {
    title: string;
    links: { key: string; label: string; href: string }[];
  };
  features: {
    title: string;
    items: string[];
  };
  social: {
    title: string;
    links: SocialLink[];
  };
  contact: {
    title: string;
    description: string;
  };
  bottom: {
    copyright: string;
    disclaimer: string;
  };
};

const footer: FooterTranslations = {
  tagline: "Helping Iraqi students choose the right major",

  about: {
    title: "About",
    description:
      "Major Compass is where informed futures begin. Empowering students to explore and confidently shape their academic path.",
    developerLabel: "Developer",
    developerName: "Muntadher Ahmed",
  },

  navigation: {
    title: "Navigation",
    links: [
      { key: "home", label: "Home", href: "home" },
      { key: "majors", label: "All Majors", href: "browse" },
      { key: "tips", label: "Tips & Advice", href: "tips-and-advice" },
      { key: "compare", label: "Compare Majors", href: "compare-majors" },
      { key: "about", label: "About", href: "about" },
    ],
  },

  features: {
    title: "Features",
    items: [
      "16+ College Majors",
      "Major Requirements Info",
      "AI-Powered Career Assistant",
      "Save & Compare Majors",
      "AI Student Test",
    ],
  },

  social: {
    title: "Find Me On",
    links: [
      {
        label: "LinkedIn",
        iconKey: "linkedin",
        href: "https://www.linkedin.com/in/montadar-ahmed-4577b6333",
        ariaLabel: "LinkedIn",
      },
      {
        label: "GitHub",
        iconKey: "github",
        href: "https://github.com/Eng-Muntadher",
        ariaLabel: "GitHub",
      },
      {
        label: "MT",
        href: "https://muntadher-ahmed.vercel.app",
        ariaLabel: "Visit my portfolio",
        className: "text-xl",
      },
    ],
  },

  contact: {
    title: "Contact Me",
    description: "Have questions or feedback? I'd be happy to hear from you!",
  },

  bottom: {
    copyright: "Major Compass. All rights reserved.",
    disclaimer:
      "Disclaimer: This app is designed for informational purposes only. Please verify all admission requirements with official universities. The developer is not responsible for decisions made based on this information.",
  },
};

export type FooterTranslationTypes = typeof footer;

export default footer;
