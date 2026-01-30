"use client";

import { Lock, LogIn, Mail } from "lucide-react";
import Link from "next/link";
import FormInputField from "./FormInputField";
import { continueWithGoogle, signInWithEmail } from "../actions";
import toast from "react-hot-toast";
import SubmitButton from "./SubmitButton";
import GoogleSignUpButton from "./GoogleSignUpButton";

function SignInForm() {
  return (
    <form
      action={async (formData) => {
        const result = await signInWithEmail(formData);
        if (result.success) toast.success(result.message);
        else toast.error(result.message);
      }}
      aria-labelledby="sign-in-heading"
      className="space-y-6 rounded-2xl shadow-xl p-8 border border-gray-100"
    >
      {/* For accessibility */}
      <h2 id="sign-in-heading" className="sr-only">
        Sign in form
      </h2>

      {/* Email */}
      <div>
        <FormInputField
          id="email"
          name="email"
          label="Email"
          type="email"
          icon={Mail}
        />
      </div>

      {/* Password */}
      <div>
        <div className="relative">
          <FormInputField
            id="password"
            name="password"
            label="Password"
            type="password"
            icon={Lock}
            placeholder="••••••••"
          />
        </div>
      </div>

      {/* Submit Button */}
      <SubmitButton type="submit">
        <LogIn className="w-5 h-5" aria-hidden="true" />
        <span>Sign Up</span>
      </SubmitButton>

      {/* FormDivider */}
      <div className="flex items-center gap-4 my-6" role="separator">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-sm text-gray-500">or</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      {/* Google Sign up */}
      <GoogleSignUpButton
        text="Continue with Google"
        onClick={continueWithGoogle}
      />

      {/* Switch to Sign Up */}
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-blue-600 hover:text-blue-700">
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  );
}

export default SignInForm;
