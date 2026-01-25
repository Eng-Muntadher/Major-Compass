"use client";

import { Lock, LogIn, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import FormInputField from "./FormInputField";
import FormErrorAlert from "./FormErrorAlert";

function SignInForm() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setFormState((prev) => ({ ...prev, error: "", loading: true }));

    const { email, password } = formState;

    // Validation
    if (!email || !password) {
      setFormState((prev) => ({
        ...prev,
        error: "Please fill in all fields",
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
    }, 2000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="sign-in-heading"
      aria-busy={formState.loading}
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
          label="Email"
          type="email"
          value={formState.email}
          onChange={(value) =>
            setFormState((prev) => ({ ...prev, email: value }))
          }
          icon={Mail}
        />
      </div>

      {/* Password */}
      <div>
        <div className="relative">
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
          />
        </div>
      </div>

      {/* Error Message */}
      <FormErrorAlert message={formState.error} />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={formState.loading}
        className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
      >
        <LogIn className="w-5 h-5" />
        <span>Sign In</span>
      </button>

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
