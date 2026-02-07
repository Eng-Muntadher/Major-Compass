"use client";

import { useState } from "react";
import { askAI } from "@/app/actions/aiActions";
import Card from "./Card";
import StudentTestForm from "./StudentTestForm";
import TestFormHeader from "./TestFormHeader";
import TestResultsView from "./TestResultsView";
import type { TestTranslationTypes } from "@/app/translations/en/studentTest";

interface TestPageProps {
  t: TestTranslationTypes;
  lang: "en" | "ar";
}

export interface StudentTestData {
  gpa: number;
  highSchoolField: string;
  city: string;
  preferSameCity: "yes" | "no";
  preferredLanguages: string[];
  subjectsStudied: string[];
  preferredFieldType: string;
}

function StudentTestPageContent({ t, lang }: TestPageProps) {
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
      newErrors.gpa = t.formErrors.gpaError;
    }

    if (!formData.highSchoolField) {
      newErrors.highSchoolField = t.formErrors.gradeError;
    }

    if (!formData.city) {
      newErrors.city = t.formErrors.cityError;
    }

    if (formData.preferredLanguages.length === 0) {
      newErrors.preferredLanguages = t.formErrors.languageError;
    }

    if (formData.subjectsStudied.length === 0) {
      newErrors.subjectsStudied = t.formErrors.subjectError;
    }

    if (!formData.preferredFieldType) {
      newErrors.preferredFieldType = t.formErrors.fieldError;
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

    const response = await askAI(formData, lang);
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
        result={t.result}
        loading={loading}
        response={AIResponse}
        onBack={handleBack}
        onRetakeTest={handleRetakeTest}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <TestFormHeader header={t.header} />

      <Card className="p-6 md:p-8">
        <StudentTestForm
          formLabels={t.form}
          formData={formData}
          errors={errors}
          onFormDataChange={setFormData}
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  );
}

export default StudentTestPageContent;
