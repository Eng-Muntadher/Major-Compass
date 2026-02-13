"use client";

import { signUpWithEmail } from "@/app/actions/emailAuth";
import { signInWithGoogle } from "@/app/actions/googleAuth";
import Link from "next/link";
import toast from "react-hot-toast";
import SubmitButton from "./SubmitButton";
import FormInputField from "./FormInputField";
import FormSelectField from "./FormSelectField";
import GoogleSignUpButton from "./GoogleSignUpButton";
import {
  UserPlus,
  Mail,
  Lock,
  User as UserIcon,
  GraduationCap,
} from "lucide-react";
import { SignUpTranslationTypes } from "../translations/en/signUp";

const GRADES = [
  "6th Grade",
  "7th Grade",
  "8th Grade",
  "9th Grade",
  "10th Grade",
  "11th Grade",
  "12th Grade",
];

interface SignUpFormProps {
  translations: SignUpTranslationTypes["form"];
  lang: "en" | "ar";
}

export default function SignUpForm({ translations, lang }: SignUpFormProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <form
        action={async (formData) => {
          const result = await signUpWithEmail(formData, lang);
          if (result.success) toast.success(result.message);
          else toast.error(result.message);
        }}
        aria-labelledby="signup-heading"
      >
        <h2 id="signup-heading" className="sr-only">
          {translations.ariaLabel}
        </h2>

        {/* Name */}
        <div className="space-y-5">
          <FormInputField
            autoComplete="name"
            id="full-name"
            name="username"
            maxLength={30}
            label={translations.fullName.label}
            type="text"
            icon={UserIcon}
            placeholder={translations.fullName.placeholder}
            required
          />

          {/* Email */}
          <FormInputField
            autoComplete="email"
            id="email"
            label={translations.email.label}
            name="email"
            type="email"
            maxLength={254}
            icon={Mail}
            placeholder={translations.email.placeholder}
            required
          />

          {/* Grade */}
          <FormSelectField
            id="grade"
            label={translations.grade.label}
            name="grade"
            options={GRADES}
            icon={GraduationCap}
            required
          />

          {/* Password */}
          <FormInputField
            autoComplete="password"
            id="password"
            label={translations.password.label}
            type="password"
            name="password"
            maxLength={64}
            icon={Lock}
            placeholder={translations.password.placeholder}
            required
          />

          {/* Confirm Password */}
          <FormInputField
            id="confirm-password"
            label={translations.confirmPassword.label}
            type="password"
            name="confirm-password"
            maxLength={64}
            autoComplete="new-password"
            icon={Lock}
            placeholder={translations.confirmPassword.placeholder}
            required
          />

          {/* Submit button */}
          <SubmitButton type="submit">
            <UserPlus className="w-5 h-5" aria-hidden="true" />
            <span>{translations.submitButton}</span>
          </SubmitButton>
        </div>
      </form>

      {/* FormDivider */}
      <div className="flex items-center gap-4 my-6" role="separator">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-sm text-gray-500">{translations.divider}</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      {/* Google Sign up */}
      <GoogleSignUpButton
        text={translations.googleButton}
        onClick={signInWithGoogle}
      />

      {/* Sign up footer */}
      <footer className="mt-6 text-center">
        <p className="text-gray-600">
          {translations.switchToSignIn.text}{" "}
          <Link
            href={`/${lang}/sign-in`}
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            {translations.switchToSignIn.link}
          </Link>
        </p>
      </footer>
    </div>
  );
}
