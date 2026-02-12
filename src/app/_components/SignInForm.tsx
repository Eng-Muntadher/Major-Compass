"use client";

import { Lock, LogIn, Mail } from "lucide-react";
import Link from "next/link";
import FormInputField from "./FormInputField";
import { signInWithEmail } from "@/app/actions/emailAuth";
import { signInWithGoogle } from "@/app/actions/googleAuth";
import toast from "react-hot-toast";
import SubmitButton from "./SubmitButton";
import GoogleSignUpButton from "./GoogleSignUpButton";
import { SignInTranslationTypes } from "../translations/en/signIn";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface SignInFormProps {
  translations: SignInTranslationTypes["form"];
  lang: "en" | "ar";
}

function SignInForm({ translations, lang }: SignInFormProps) {
  const searchParams = useSearchParams();
  // The redirect is set by protected routes (like /profile or /saved-majors) when they redirect unauthenticated users.
  const redirectUrl = searchParams.get("redirect") || "/";

  // Show toast if redirected due to auth
  useEffect(() => {
    // Dismess any existing toasts to avoid stacking
    toast.dismiss();
    if (searchParams.get("error") === "profile-access-denied") {
      // Profile error if user tried to access profile page without being signed in
      toast.error("Please sign in to access your profile");
    } else if (searchParams.get("error") === "saved-majors-access-denied") {
      // Saved majors error if user tried to access saved majors page without being signed in
      toast.error("Please sign in to access your saved majors");
    }
  }, [searchParams]);

  return (
    <form
      action={async (formData) => {
        const result = await signInWithEmail(formData, lang, redirectUrl);
        if (result.success) toast.success(result.message);
        else toast.error(result.message);
      }}
      aria-labelledby="sign-in-heading"
      className="space-y-6 rounded-2xl shadow-xl p-8 border border-gray-100"
    >
      {/* For accessibility */}
      <h2 id="sign-in-heading" className="sr-only">
        {translations.ariaLabel}
      </h2>

      {/* Email */}
      <div>
        <FormInputField
          id="email"
          autoComplete="email"
          maxLength={30}
          name="email"
          label={translations.email.label}
          type="email"
          icon={Mail}
        />
      </div>

      {/* Password */}
      <div>
        <div className="relative">
          <FormInputField
            autoComplete="password"
            id="password"
            maxLength={15}
            name="password"
            label={translations.password.label}
            type="password"
            icon={Lock}
            placeholder={translations.password.placeholder}
          />
        </div>
      </div>

      {/* Submit Button */}
      <SubmitButton type="submit">
        <LogIn className="w-5 h-5" aria-hidden="true" />
        <span>{translations.submitButton}</span>
      </SubmitButton>

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

      {/* Switch to Sign Up */}
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          {translations.switchToSignUp.text}{" "}
          <Link
            href={`/${lang}/sign-up`}
            className="text-blue-600 hover:text-blue-700"
          >
            {translations.switchToSignUp.link}
          </Link>
        </p>
      </div>
    </form>
  );
}

export default SignInForm;
