const studentTest = {
  header: {
    title: "Student Assessment Test",
    description:
      "Help us understand your background and preferences to provide personalized major recommendations.",
  },

  form: {
    gpa: {
      label: "GPA (0-100)",
      placeholder: "Enter your GPA",
      error: {
        required: "GPA is required",
        invalid: "Enter a valid GPA between 0 and 100",
      },
    },
    highSchoolField: {
      label: "High School Field of Study",
      placeholder: "Select your field",
    },
    city: {
      label: "City",
      placeholder: "Select your city",
    },
    preferSameCity: {
      label: "Do you prefer to study in the same city?",
      options: {
        yes: "Yes",
        no: "No",
        noPreference: "No preference",
      },
    },
    preferredLanguages: {
      label: "Preferred Study Language(s)",
    },
    subjectsStudied: {
      label: "Subjects Studied",
    },
    preferredFieldType: {
      label: "Preferred Field Type",
      placeholder: "Select field type",
    },
    submitButton: {
      label: "Get My Results",
    },
  },

  formErrors: {
    gpaError: "GPA must be between 0 and 100",
    gradeError: "Please select your high school field",
    cityError: "Please select your city",
    languageError: "Please select at least one language",
    subjectError: "Please select at least one subject",
    fieldError: "Please select your preferred field type",
  },

  result: {
    header: {
      backLabel: "Back to Test",
      title: "Your Personalized Assessment",
      description: "AI-powered analysis based on your profile and preferences",
    },

    aiBox: {
      title: "AI Career Advisor",
      loadingText: "Analyzing your profile and generating recommendations...",
      loadedText: "Here are your personalized recommendations",
      processingText:
        "Processing your information and generating personalized recommendations...",
    },

    aiDisclaimer: {
      importantLabel: "Important:",
      message:
        "These results are AI-generated suggestions based on your inputs. They should be used as general guidance only and may not be fully accurate. Please consult with academic advisors, visit universities, talk to current students, and consider multiple factors before making your final decision.",
    },

    nextSteps: {
      heading: "🚀 What's Next?",
      steps: [
        "Explore my comprehensive database of college majors",
        "Read detailed information about each major including career prospects",
        "Compare different majors side-by-side",
        "Save your favorite majors for future reference",
        "Consult with my AI assistant for more personalized guidance",
      ],
      buttons: {
        explore: "Explore All Majors",
        retake: "Retake Test",
      },
    },
  },
};

export default studentTest;
export type TestTranslationTypes = typeof studentTest;
