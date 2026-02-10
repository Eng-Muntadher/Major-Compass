import {
  Bookmark,
  BookOpen,
  MessageCircle,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";

const home = {
  hero: {
    title: "Discover Your Perfect College Major",
    description:
      "Explore 16+ college majors tailored for Iraqi students. Get AI-powered recommendations, expert tips, and make informed decisions about your future.",
    cta: {
      explore: "Explore Majors",
      getStarted: "Get Started",
      signIn: "Sign In",
    },
  },

  featuresTitle: "What This app Offers",

  features: [
    {
      title: "Detailed Major Guides",
      description:
        "Comprehensive information about GPA requirements, subjects, skills, pros & cons, and career opportunities",
      icon: BookOpen,
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "AI Career Assistant",
      description:
        "Get personalized recommendations and instant answers to all your questions about majors and careers",
      icon: MessageCircle,

      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Market Demand Insights",
      description:
        "Understand job demand inside and outside Iraq for each major to make informed decisions",
      icon: TrendingUp,
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
  ],

  keyFeaturesTitle: "Key Features",

  keyFeatures: [
    {
      title: "Smart Search & Filters",
      description:
        "Find majors by category, difficulty, or GPA requirements with our intuitive search system",
      icon: Search,
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Save & Compare",
      description:
        "Bookmark your favorite majors and compare them side-by-side to find the best fit",
      icon: Bookmark,
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "AI-Powered Analysis",
      description:
        "Use our intelligent assistant to analyze majors and get personalized career guidance",
      icon: MessageCircle,

      iconBgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Compare Majors",
      description:
        "Side-by-side comparison of majors with detailed information on requirements and opportunities",
      icon: Users,
      iconBgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
  ],

  stats: [
    { value: "16+", label: "College Majors" },
    { value: "8", label: "Categories" },
    { value: "🎯", label: "AI-Powered Guidance" },
  ],

  cta: {
    title: "Ready to Find Your Perfect Major?",
    description:
      "Join Iraqi students who are making informed decisions about their future. Start exploring today!",
    takeTest: "Take student test",
    signUp: "Sign Up",
  },
};

export type HomeTranslationTypes = typeof home;

export default home;
