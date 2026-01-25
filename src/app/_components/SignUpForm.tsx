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
import FormErrorAlert from "../_components/FormErrorAlert";
import GoogleSignUpButton from "./GoogleSignUpButton";
import Link from "next/link";
import { useState } from "react";

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
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    grade: "12th Grade",
    error: "",
    loading: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setFormState((prev) => ({ ...prev, error: "", loading: true }));

    const { name, email, password, confirmPassword } = formState;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setFormState((prev) => ({
        ...prev,
        error: "Please fill in all fields",
        loading: false,
      }));
      return;
    }

    if (password !== confirmPassword) {
      setFormState((prev) => ({
        ...prev,
        error: "Passwords do not match",
        loading: false,
      }));
      return;
    }

    if (password.length < 6) {
      setFormState((prev) => ({
        ...prev,
        error: "Password must be at least 6 characters",
        loading: false,
      }));
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setFormState((prev) => ({ ...prev, loading: false }));
      console.log("Account created:", {
        name: formState.name,
        email: formState.email,
        grade: formState.grade,
      });
    }, 2000);
  };

  const handleGoogleSignUp = () => {
    console.log("Google sign up clicked");
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <form onSubmit={handleSubmit} aria-labelledby="signup-heading">
        <h2 id="signup-heading" className="sr-only">
          Sign up form
        </h2>

        <div className="space-y-5">
          <FormInputField
            id="full-name"
            label="Full Name"
            type="text"
            value={formState.name}
            onChange={(value) =>
              setFormState((prev) => ({ ...prev, name: value }))
            }
            icon={UserIcon}
            placeholder="Ahmed Ali"
            required
          />

          <FormInputField
            id="email"
            label="Email"
            type="email"
            value={formState.email}
            onChange={(value) =>
              setFormState((prev) => ({ ...prev, email: value }))
            }
            icon={Mail}
            placeholder="student@example.com"
            required
          />

          <FormSelectField
            id="grade"
            label="Grade"
            value={formState.grade}
            onChange={(value) =>
              setFormState((prev) => ({ ...prev, grade: value }))
            }
            options={GRADES}
            icon={GraduationCap}
            required
          />

          <FormInputField
            id="password"
            label="Password"
            type="password"
            value={formState.password}
            onChange={(value) =>
              setFormState((prev) => ({ ...prev, password: value }))
            }
            icon={Lock}
            placeholder="••••••••"
            required
          />

          <FormInputField
            id="confirm-password"
            label="Confirm Password"
            type="password"
            value={formState.confirmPassword}
            onChange={(value) =>
              setFormState((prev) => ({ ...prev, confirmPassword: value }))
            }
            icon={Lock}
            placeholder="••••••••"
            required
          />

          {/* Error element */}
          <FormErrorAlert message={formState.error} />

          {/* Submit button */}
          <button
            type="submit"
            disabled={formState.loading}
            className="w-full bg-linear-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer font-medium"
            aria-busy={formState.loading}
          >
            <UserPlus className="w-5 h-5" aria-hidden="true" />
            <span>{formState.loading ? "Creating Account..." : "Sign Up"}</span>
          </button>
        </div>
      </form>

      {/* FormDivider */}
      <div className="flex items-center gap-4 my-6" role="separator">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-sm text-gray-500">or</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      {/* Google Sign up */}
      <GoogleSignUpButton onClick={handleGoogleSignUp} />

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
