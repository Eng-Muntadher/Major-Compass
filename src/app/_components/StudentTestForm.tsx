import { ArrowRight } from "lucide-react";
import Input from "../_components/Input";
import { Button } from "../_components/Button";
import FormField from "../_components/FormField";
import SelectField from "../_components/SelectField";
import CheckboxGroup from "../_components/CheckBoxGroup";
import RadioField from "../_components/RadioField";
import {
  fieldTypes,
  highSchoolFields,
  iraqiCities,
  preferredLanguages,
  subjects,
} from "../_data/testData";
import { StudentTestData } from "./StudentTestPageContent";
import { TestTranslationTypes } from "../translations/en/studentTest";

interface StudentTestFormProps {
  formData: StudentTestData;
  errors: { [key: string]: string };
  onFormDataChange: (data: StudentTestData) => void;
  onSubmit: (e: React.FormEvent) => void;
  formLabels: TestTranslationTypes["form"];
}

export default function StudentTestForm({
  formData,
  errors,
  onFormDataChange,
  onSubmit,
  formLabels,
}: StudentTestFormProps) {
  const handleLanguageToggle = (value: string) => {
    onFormDataChange({
      ...formData,
      preferredLanguages: formData.preferredLanguages.includes(value)
        ? formData.preferredLanguages.filter((l) => l !== value)
        : [...formData.preferredLanguages, value],
    });
  };

  const handleSubjectToggle = (value: string) => {
    onFormDataChange({
      ...formData,
      subjectsStudied: formData.subjectsStudied.includes(value)
        ? formData.subjectsStudied.filter((s) => s !== value)
        : [...formData.subjectsStudied, value],
    });
  };

  const isEnglish = formLabels.gpa.label.startsWith("G");

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      {/* GPA */}
      <FormField
        label={formLabels.gpa.label}
        required
        error={errors.gpa}
        htmlFor="gpa"
      >
        <Input
          id="gpa"
          type="number"
          min="0"
          max="100"
          step="0.5"
          value={formData.gpa || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormDataChange({
              ...formData,
              gpa: parseFloat(e.target.value) || 0,
            })
          }
          placeholder={formLabels.gpa.placeholder}
          className={errors.gpa ? "border-red-500" : ""}
          aria-invalid={!!errors.gpa}
          aria-describedby={errors.gpa ? "gpa-error" : undefined}
        />
      </FormField>

      {/* High School Field */}
      <SelectField
        label={formLabels.highSchoolField.label}
        id="highSchoolField"
        value={formData.highSchoolField}
        onChange={(value) =>
          onFormDataChange({ ...formData, highSchoolField: value })
        }
        options={highSchoolFields}
        error={errors.highSchoolField}
        placeholder={formLabels.highSchoolField.placeholder}
        required
        isEnglish={isEnglish}
      />

      {/* City */}
      <SelectField
        label={formLabels.city.label}
        id="city"
        value={formData.city}
        onChange={(value) => onFormDataChange({ ...formData, city: value })}
        options={iraqiCities}
        error={errors.city}
        placeholder={formLabels.city.placeholder}
        required
        isEnglish={isEnglish}
      />

      {/* Prefer Same City */}
      <RadioField
        label={formLabels.preferSameCity.label}
        name="preferSameCity"
        value={formData.preferSameCity}
        onChange={(value) =>
          onFormDataChange({
            ...formData,
            preferSameCity: value as "yes" | "no",
          })
        }
        options={[
          { value: "yes", label: formLabels.preferSameCity.options.yes },
          { value: "no", label: formLabels.preferSameCity.options.no },
          {
            value: "no-preference",
            label: formLabels.preferSameCity.options.noPreference,
          },
        ]}
        required
      />

      {/* Preferred Languages */}
      <CheckboxGroup
        label={formLabels.preferredLanguages.label}
        options={preferredLanguages}
        selected={formData.preferredLanguages}
        onToggle={handleLanguageToggle}
        error={errors.preferredLanguages}
        required
        isEnglish={isEnglish}
      />

      {/* Subjects Studied */}
      <CheckboxGroup
        label={formLabels.subjectsStudied.label}
        options={subjects}
        selected={formData.subjectsStudied}
        onToggle={handleSubjectToggle}
        error={errors.subjectsStudied}
        required
        isEnglish={isEnglish}
      />

      {/* Preferred Field Type */}
      <SelectField
        label={formLabels.preferredFieldType.label}
        id="preferredFieldType"
        value={formData.preferredFieldType}
        onChange={(value) =>
          onFormDataChange({ ...formData, preferredFieldType: value })
        }
        options={fieldTypes}
        error={errors.preferredFieldType}
        placeholder={formLabels.preferredFieldType.placeholder}
        required
        isEnglish={isEnglish}
      />

      {/* Submit Button */}
      <Button
        rightIcon={<ArrowRight className="ml-2 h-5 w-5" />}
        type="submit"
        className="w-full font-semibold"
      >
        {formLabels.submitButton.label}
      </Button>
    </form>
  );
}
