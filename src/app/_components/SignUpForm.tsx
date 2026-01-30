"use client";

import {
  UserPlus,
  Mail,
  Lock,
  User as UserIcon,
  GraduationCap,
} from "lucide-react";
import FormInputField from "./FormInputField";
import FormSelectField from "./FormSelectField";
import GoogleSignUpButton from "./GoogleSignUpButton";
import Link from "next/link";
import { signUpWithEmail, signUpWithGoogle } from "../actions";
import toast from "react-hot-toast";
import SubmitButton from "./SubmitButton";

const GRADES = [
  "6th Grade",
  "7th Grade",
  "8th Grade",
  "9th Grade",
  "10th Grade",
  "11th Grade",
  "12th Grade",
];

export default function SignUpForm() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <form
        action={async (formData) => {
          const result = await signUpWithEmail(formData);
          if (result.success) toast.success(result.message);
          else toast.error(result.message);
        }}
        aria-labelledby="signup-heading"
      >
        <h2 id="signup-heading" className="sr-only">
          Sign up form
        </h2>

        <div className="space-y-5">
          <FormInputField
            id="full-name"
            name="username"
            label="Full Name"
            type="text"
            icon={UserIcon}
            placeholder="Ahmed Ali"
            required
          />

          <FormInputField
            id="email"
            label="Email"
            name="email"
            type="email"
            icon={Mail}
            placeholder="student@example.com"
            required
          />

          <FormSelectField
            id="grade"
            label="Grade"
            name="grade"
            options={GRADES}
            icon={GraduationCap}
            required
          />

          <FormInputField
            id="password"
            label="Password"
            type="password"
            name="password"
            icon={Lock}
            placeholder="••••••••"
            required
          />

          <FormInputField
            id="confirm-password"
            label="Confirm Password"
            type="password"
            name="confirm-password"
            icon={Lock}
            placeholder="••••••••"
            required
          />

          {/* Submit button */}
          <SubmitButton type="submit">
            <UserPlus className="w-5 h-5" aria-hidden="true" />
            <span>Sign Up</span>
          </SubmitButton>
        </div>
      </form>

      {/* FormDivider */}
      <div className="flex items-center gap-4 my-6" role="separator">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-sm text-gray-500">or</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      {/* Google Sign up */}
      <GoogleSignUpButton
        text="Sign up with Google"
        onClick={signUpWithGoogle}
      />

      {/* Sign up footer */}
      <footer className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Sign In
          </Link>
        </p>
      </footer>
    </div>
  );
}
