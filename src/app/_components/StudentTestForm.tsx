import { ArrowRight } from "lucide-react";
import Input from "../_components/Input";
import Button from "../_components/Button";
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
import type { StudentTestData } from "../student-test/page";

interface StudentTestFormProps {
  formData: StudentTestData;
  errors: { [key: string]: string };
  onFormDataChange: (data: StudentTestData) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function StudentTestForm({
  formData,
  errors,
  onFormDataChange,
  onSubmit,
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

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      {/* GPA */}
      <FormField label="GPA (0-100)" required error={errors.gpa} htmlFor="gpa">
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
          placeholder="Enter your GPA"
          className={errors.gpa ? "border-red-500" : ""}
          aria-invalid={!!errors.gpa}
          aria-describedby={errors.gpa ? "gpa-error" : undefined}
        />
      </FormField>

      {/* High School Field */}
      <SelectField
        label="High School Field of Study"
        id="highSchoolField"
        value={formData.highSchoolField}
        onChange={(value) =>
          onFormDataChange({ ...formData, highSchoolField: value })
        }
        options={highSchoolFields}
        error={errors.highSchoolField}
        placeholder="Select your field"
        required
      />

      {/* City */}
      <SelectField
        label="City"
        id="city"
        value={formData.city}
        onChange={(value) => onFormDataChange({ ...formData, city: value })}
        options={iraqiCities}
        error={errors.city}
        placeholder="Select your city"
        required
      />

      {/* Prefer Same City */}
      <RadioField
        label="Do you prefer to study in the same city?"
        name="preferSameCity"
        value={formData.preferSameCity}
        onChange={(value) =>
          onFormDataChange({
            ...formData,
            preferSameCity: value as "yes" | "no",
          })
        }
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
        required
      />

      {/* Preferred Languages */}
      <CheckboxGroup
        label="Preferred Study Language(s)"
        options={preferredLanguages}
        selected={formData.preferredLanguages}
        onToggle={handleLanguageToggle}
        error={errors.preferredLanguages}
        required
      />

      {/* Subjects Studied */}
      <CheckboxGroup
        label="Subjects Studied"
        options={subjects}
        selected={formData.subjectsStudied}
        onToggle={handleSubjectToggle}
        error={errors.subjectsStudied}
        required
      />

      {/* Preferred Field Type */}
      <SelectField
        label="Preferred Field Type"
        id="preferredFieldType"
        value={formData.preferredFieldType}
        onChange={(value) =>
          onFormDataChange({ ...formData, preferredFieldType: value })
        }
        options={fieldTypes}
        error={errors.preferredFieldType}
        placeholder="Select field type"
        required
      />

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg transition-colors cursor-pointer"
        >
          Get My Results
          <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
        </Button>
      </div>
    </form>
  );
}
