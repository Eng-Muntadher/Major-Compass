"use client";

import { useState } from "react";
import Card from "../_components/Card";
import TestFormHeader from "../_components/TestFormHeader";
import StudentTestForm from "../_components/StudentTestForm";
import TestResultsView from "../_components/TestResultsView";

export interface StudentTestData {
  gpa: number;
  highSchoolField: string;
  city: string;
  preferSameCity: "yes" | "no";
  preferredLanguages: string[];
  subjectsStudied: string[];
  preferredFieldType: string;
}

const MOCK_RESPONSE =
  "# Personalized Academic Analysis & Recommendations\n\nBased on your profile — a literary branch student from Dohuk with a GPA of 90.00% who has studied math — here is my comprehensive analysis and recommendations:\n\n## 📊 Academic Assessment\n\n**Strong Academic Performance!** With a GPA of 90.00%, you have access to highly competitive majors:\n\n- Engineering (Computer, Electrical, Mechanical, Civil)\n- Pharmacy\n- Computer Science\n- Biotechnology\n- Petroleum Engineering\n\n## 🎯 Field-Specific Recommendations\n\n### Literary Branch Strengths\n\nYour literary background equips you with strong communication and analytical skills. Top recommendations:\n\n- Law - High prestige and good earning potential\n- Languages & Translation - Especially with your language preferences\n- Education - Teaching and educational administration\n- Media & Journalism**\n- **Psychology & Social Work**\n- **Business Administration - Many literary students excel here\n\n## 🌐 Language & International Opportunities\n\nArabic-medium programs are widely available and offer:\n\n- Strong local career opportunities\n- Better understanding of course materials\n- All major fields available in Arabic\n\n## 📍 Location & Universities\n\nYou prefer to study in Dohuk. While Dohuk has educational institutions, consider:\n\n- Local universities for accessible programs\n- Major cities (Baghdad, Basra, Erbil) for specialized fields\n- Balance between proximity and program quality\n\n## 📚 Study Style Match\n\nYou prefer theoretical, conceptual learning. Great fits:\n\n- Law - Theory and analysis\n- Philosophy & Literature\n- Pure Mathematics\n- Theoretical Physics\n- Economics & Social Sciences\n\n## 🎓 My Top 3 Specific Recommendations for You\n\n1. Law - Prestigious career with good income potential and respect in society.\n2. Business Administration - Versatile degree that opens many doors in various industries.\n3. English Language & Translation - Especially if you have strong English skills.";

export default function StudentTest() {
  const [formData, setFormData] = useState<StudentTestData>({
    gpa: 0,
    highSchoolField: "",
    city: "",
    preferSameCity: "yes",
    preferredLanguages: [],
    subjectsStudied: [],
    preferredFieldType: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (formData.gpa < 0 || formData.gpa > 100) {
      newErrors.gpa = "GPA must be between 0 and 100";
    }

    if (!formData.highSchoolField) {
      newErrors.highSchoolField = "Please select your high school field";
    }

    if (!formData.city) {
      newErrors.city = "Please select your city";
    }

    if (formData.preferredLanguages.length === 0) {
      newErrors.preferredLanguages = "Please select at least one language";
    }

    if (formData.subjectsStudied.length === 0) {
      newErrors.subjectsStudied = "Please select at least one subject";
    }

    if (!formData.preferredFieldType) {
      newErrors.preferredFieldType = "Please select your preferred field type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Submit!", formData);
      setLoading(true);
      setSubmitted(true);

      // Scroll to the top smoothly
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // Simulate API call
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  };

  const handleBack = () => {
    setSubmitted(false);
    setLoading(false);
  };

  const handleRetakeTest = () => {
    setSubmitted(false);
    setLoading(false);
    setFormData({
      gpa: 0,
      highSchoolField: "",
      city: "",
      preferSameCity: "yes",
      preferredLanguages: [],
      subjectsStudied: [],
      preferredFieldType: "",
    });
    setErrors({});

    // Scroll to the top smoothly
    window.scrollTo({
      top: 0,
      behavior: "smooth", // or "auto" for instant
    });
  };

  if (submitted) {
    return (
      <TestResultsView
        loading={loading}
        response={MOCK_RESPONSE}
        onBack={handleBack}
        onRetakeTest={handleRetakeTest}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <TestFormHeader />

      <Card className="p-6 md:p-8">
        <StudentTestForm
          formData={formData}
          errors={errors}
          onFormDataChange={setFormData}
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  );
}
