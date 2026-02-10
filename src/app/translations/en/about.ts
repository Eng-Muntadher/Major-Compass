const about = {
  header: {
    title: "About Major Compass",
    subtitle: "Helping Students Find Their Perfect Career Path",
  },
  mission: {
    title: "My Mission",
    paragraphs: [
      "College Guide was created to help students (especially 6th-grade Iraqi students) make informed decisions about their future. I understand that choosing a college major is one of the most important decisions in a young person's life.",
      "My platform provides comprehensive information about different majors, career opportunities, and personalized guidance to help students discover the path that's right for them.",
    ],
  },
  purpose: {
    title: "Why I Built This",
    paragraphs: [
      "Many students struggle to find clear, accessible information about college majors and career paths (I was like this once). This often leads to confusion and regret later in life.",
      "I built College Guide to bridge this gap, providing students with the knowledge and tools they need to make confident, informed decisions about their education and future careers.",
    ],
  },
  features: [
    {
      emoji: "📚",
      title: "Comprehensive Major Information",
      description:
        "16+ detailed major profiles across 8 categories with GPA requirements, skills needed, and career opportunities",
      gradientFrom: "from-blue-50",
      gradientTo: "to-purple-50",
      borderColor: "border-blue-100",
    },
    {
      emoji: "🤖",
      title: "AI-Powered Guidance",
      description:
        "Smart assistant that analyzes majors, provides personalized recommendations, and answers your questions",
      gradientFrom: "from-purple-50",
      gradientTo: "to-pink-50",
      borderColor: "border-purple-100",
    },
    {
      emoji: "💡",
      title: "Expert Tips & Advice",
      description:
        "Practical guidance on choosing the right major, avoiding common mistakes, and preparing for college",
      gradientFrom: "from-green-50",
      gradientTo: "to-blue-50",
      borderColor: "border-green-100",
    },
    {
      emoji: "🌍",
      title: "Bilingual Support",
      description:
        "Full support for both English and Arabic to serve all students",
      gradientFrom: "from-yellow-50",
      gradientTo: "to-orange-50",
      borderColor: "border-yellow-100",
    },
  ],
  contact: {
    title: "Get In Touch",
    description: "Have questions or feedback? I'd love to hear from you!",
    links: [
      {
        text: "muntadheralshammari33@gmail.com",
      },
      {
        text: "Eng-Muntadher",
      },
      {
        text: "My Portfolio",
      },
    ],
  },
};

export type aboutTranslation = typeof about;

export default about;
