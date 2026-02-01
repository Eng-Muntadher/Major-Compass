"use client";

import { useState } from "react";
import Card from "../_components/Card";
import TestFormHeader from "../_components/TestFormHeader";
import StudentTestForm from "../_components/StudentTestForm";
import TestResultsView from "../_components/TestResultsView";
import { askAI } from "../actions";

export interface StudentTestData {
  gpa: number;
  highSchoolField: string;
  city: string;
  preferSameCity: "yes" | "no";
  preferredLanguages: string[];
  subjectsStudied: string[];
  preferredFieldType: string;
}

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
  const [AIResponse, setAIResponse] = useState<null | string>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      setSubmitted(true);

      // Scroll to the top smoothly
      document.getElementById("main-scroll")?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    const response = await askAI(formData);
    setAIResponse(response);
    setLoading(false);
  };

  const handleBack = () => {
    setSubmitted(false);
    setLoading(false);

    document.getElementById("main-scroll")?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
    document.getElementById("main-scroll")?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (submitted) {
    return (
      <TestResultsView
        loading={loading}
        response={AIResponse}
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
