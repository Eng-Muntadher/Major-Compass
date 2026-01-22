export interface TipSection {
  id: string;
  title: string;
  titleArabic: string;
  icon: string;
  content: TipContent[];
}

export interface TipContent {
  heading: string;
  headingArabic: string;
  points: string[];
}

export const tips: TipSection[] = [
  {
    id: "how-to-choose",
    title: "How to Choose the Right Major",
    titleArabic: "كيف تختار التخصص المناسب",
    icon: "🎯",
    content: [
      {
        heading: "Know Yourself First",
        headingArabic: "اعرف نفسك أولاً",
        points: [
          "Identify your strengths and weaknesses in different subjects",
          "Think about what activities make you happy and engaged",
          "Consider your personality: Do you like working with people or alone?",
          "Ask yourself: What problems do I enjoy solving?",
          "Reflect on your values: What matters most to you in a career?",
        ],
      },
      {
        heading: "Research Thoroughly",
        headingArabic: "ابحث بشكل شامل",
        points: [
          "Read about different majors and their requirements",
          "Talk to professionals working in fields that interest you",
          "Watch videos and documentaries about different careers",
          "Visit universities during open days if possible",
          "Join online communities and forums related to your interests",
        ],
      },
      {
        heading: "Consider Practical Factors",
        headingArabic: "خذ بعين الاعتبار العوامل العملية",
        points: [
          "Check the minimum GPA requirements for each major",
          "Research job market demand in Iraq and globally",
          "Consider the duration and cost of education",
          "Think about future salary and career growth",
          "Evaluate the difficulty level realistically",
        ],
      },
      {
        heading: "Try Before You Commit",
        headingArabic: "جرب قبل أن تلتزم",
        points: [
          "Take online courses or tutorials in subjects that interest you",
          "Volunteer or intern in related fields during summer",
          "Shadow professionals for a day to see what they do",
          "Participate in workshops and competitions",
          "Join clubs related to potential majors",
        ],
      },
    ],
  },
  {
    id: "common-mistakes",
    title: "Common Mistakes to Avoid",
    titleArabic: "الأخطاء الشائعة التي يجب تجنبها",
    icon: "⚠️",
    content: [
      {
        heading: "Following Others Blindly",
        headingArabic: "اتباع الآخرين بشكل أعمى",
        points: [
          "Don't choose a major just because your friends chose it",
          "Your parents' preferences are important, but it's YOUR future",
          'Don\'t pick a major only because it\'s "prestigious" or "popular"',
          "Every person is unique - what works for others may not work for you",
          "Trust your own judgment and interests",
        ],
      },
      {
        heading: "Focusing Only on Salary",
        headingArabic: "التركيز على الراتب فقط",
        points: [
          "High salary won't make you happy if you hate your work",
          "Passion and interest lead to excellence and better opportunities",
          "Job satisfaction is more important than initial salary",
          "You'll spend most of your life working - choose wisely",
          "Money is important, but not the only factor",
        ],
      },
      {
        heading: "Ignoring Your Abilities",
        headingArabic: "تجاهل قدراتك",
        points: [
          "Be honest about your academic strengths",
          "Don't choose a math-heavy major if you struggle with math",
          "Some skills can be learned, but basic aptitude matters",
          "Difficulty doesn't mean impossible, but be realistic",
          "Choose something challenging but achievable for you",
        ],
      },
      {
        heading: "Not Planning for the Future",
        headingArabic: "عدم التخ��يط للمستقبل",
        points: [
          "Research job market trends and future demand",
          "Consider technological changes affecting different fields",
          "Think about global opportunities, not just local ones",
          "Some majors are becoming obsolete, others are emerging",
          "Plan for a career that will still be relevant in 10-20 years",
        ],
      },
    ],
  },
  {
    id: "college-expectations",
    title: "What to Expect in College",
    titleArabic: "ماذا تتوقع في الجامعة",
    icon: "🎓",
    content: [
      {
        heading: "Academic Life",
        headingArabic: "الحياة الأكاديمية",
        points: [
          "College is very different from school - more independence and responsibility",
          "Professors expect you to study independently",
          "Exams are more challenging and require deeper understanding",
          "You'll need to manage your time effectively",
          "Group projects and presentations are common",
        ],
      },
      {
        heading: "Social Experience",
        headingArabic: "التجربة الاجتماعية",
        points: [
          "You'll meet diverse people from different backgrounds",
          "Join clubs and organizations to make friends",
          "Networking is important for your future career",
          "Balance social life with academic responsibilities",
          "Learn from your peers as much as from professors",
        ],
      },
      {
        heading: "Personal Growth",
        headingArabic: "النمو الشخصي",
        points: [
          "College helps you become more independent",
          "You'll learn to solve problems on your own",
          "Develop critical thinking and analytical skills",
          "Build your professional identity and goals",
          "Learn to handle stress and challenges",
        ],
      },
      {
        heading: "Practical Skills",
        headingArabic: "المهارات العملية",
        points: [
          "Learn time management and prioritization",
          "Develop research and writing skills",
          "Master presentation and communication",
          "Build technical skills specific to your field",
          "Gain practical experience through internships",
        ],
      },
    ],
  },
  {
    id: "preparation-tips",
    title: "Tips for High School Graduates",
    titleArabic: "نصائح لخريجي الثانوية",
    icon: "📝",
    content: [
      {
        heading: "Before Starting College",
        headingArabic: "قبل البدء بالجامعة",
        points: [
          "Review prerequisites for your chosen major",
          "Improve your English language skills - it's crucial",
          "Learn basic computer skills if you haven't already",
          "Read books related to your field of interest",
          "Prepare mentally for the increased workload",
        ],
      },
      {
        heading: "First Year Success",
        headingArabic: "النجاح في السنة الأولى",
        points: [
          "Attend all classes - don't skip even if attendance isn't mandatory",
          "Take good notes and review them regularly",
          "Ask questions when you don't understand",
          "Form study groups with serious students",
          "Visit professors during office hours for help",
        ],
      },
      {
        heading: "Building Your Future",
        headingArabic: "بناء مستقبلك",
        points: [
          "Start building your resume from year one",
          "Look for internship opportunities early",
          "Develop skills beyond the curriculum",
          "Build a professional network",
          "Work on personal projects related to your field",
        ],
      },
      {
        heading: "Maintaining Balance",
        headingArabic: "الحفاظ على التوازن",
        points: [
          "Take care of your physical and mental health",
          "Exercise regularly and eat healthy",
          "Get enough sleep - it's essential for learning",
          "Make time for hobbies and relaxation",
          "Don't hesitate to seek help when stressed",
        ],
      },
    ],
  },
  {
    id: "career-planning",
    title: "Career Planning Guide",
    titleArabic: "دليل التخطيط المهني",
    icon: "💼",
    content: [
      {
        heading: "During Your Studies",
        headingArabic: "خلال دراستك",
        points: [
          "Maintain a good GPA - it matters for graduate school and jobs",
          "Seek internships every summer",
          "Participate in competitions and conferences",
          "Build a portfolio of your work and projects",
          "Get recommendation letters from professors",
        ],
      },
      {
        heading: "Skills to Develop",
        headingArabic: "المهارات التي يجب تطويرها",
        points: [
          "Communication skills - written and verbal",
          "Leadership and teamwork abilities",
          "Problem-solving and critical thinking",
          "Technical skills relevant to your field",
          "Adaptability and continuous learning mindset",
        ],
      },
      {
        heading: "Networking Strategies",
        headingArabic: "استراتيجيات التواصل",
        points: [
          "Connect with alumni working in your field",
          "Attend industry events and career fairs",
          "Build a professional LinkedIn profile",
          "Join professional associations",
          "Maintain relationships with professors and mentors",
        ],
      },
      {
        heading: "After Graduation",
        headingArabic: "بعد التخرج",
        points: [
          "Start job searching in your final year",
          "Consider graduate studies if it benefits your career",
          "Be open to entry-level positions for experience",
          "Continue learning and developing your skills",
          "Stay updated with industry trends and changes",
        ],
      },
    ],
  },
];
