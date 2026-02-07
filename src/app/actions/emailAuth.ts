"use server";

import { createClient } from "@/app/_lib/supabase";
import { redirect } from "next/navigation";
import { t, type Lang } from "./actionsTranslation";

// This function handles sign up and then creates a new profile in the database
export async function signUpWithEmail(formData: FormData, lang: Lang = "en") {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const grade = formData.get("grade") as string;
  const confirmPassword = formData.get("confirm-password") as string;

  if (password !== confirmPassword) {
    return {
      success: false,
      message: t(lang, "passwordMismatch"),
    };
  }

  const supabase = await createClient();

  // Step 1: Check if email already exists in profiles
  const { data: existingProfile, error: checkError } = await supabase
    .from("profiles")
    .select("email")
    .eq("email", email)
    .maybeSingle();

  if (checkError && checkError.code !== "PGRST116") {
    // PGRST116 is "no rows returned" which is fine
    console.error("Error checking email:", checkError);
    return {
      success: false,
      message: t(lang, "errorOccurred"),
    };
  }

  if (existingProfile) {
    return {
      success: false,
      message: t(lang, "emailExists"),
    };
  }

  // Step 2: Sign up the user
  const { data: authData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "http://localhost:3000/auth/callback",
    },
  });

  if (error) {
    return { success: false, message: error.message };
  }

  // Step 3: Create profile (only if user was created)
  if (authData.user) {
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      username,
      email,
      grade,
      avatar_url: null,
      bookmarks: [],
    });

    if (profileError) {
      console.error("Error creating profile:", profileError);

      // Check if it's a unique constraint error
      if (profileError.code === "23505") {
        return {
          success: false,
          message: t(lang, "emailOrUsernameTaken"),
        };
      }

      return {
        success: false,
        message: t(lang, "profileSetupFailed"),
      };
    }
  }

  return {
    success: true,
    message: t(lang, "confirmationSent"),
  };
}

export async function signInWithEmail(formData: FormData, lang: Lang = "en") {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validation 1: Check if fields are filled
  if (!email || !password) {
    return {
      success: false,
      message: t(lang, "fillAllFields"),
    };
  }

  // Validation 2: Check if email is valid format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: t(lang, "invalidEmail"),
    };
  }

  // Validation 3: Check password length
  if (password.length < 6) {
    return {
      success: false,
      message: t(lang, "passwordTooShort"),
    };
  }

  const supabase = await createClient();

  // Attempt to sign in
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // Handle authentication errors
  if (error) {
    console.error("Sign in error:", error);

    // Provide user-friendly error messages
    if (error.message.includes("Invalid login credentials")) {
      return {
        success: false,
        message: t(lang, "invalidCredentials"),
      };
    }

    if (error.message.includes("Email not confirmed")) {
      return {
        success: false,
        message: t(lang, "emailNotConfirmed"),
      };
    }

    // Generic error fallback
    return {
      success: false,
      message: error.message || t(lang, "errorOccurred"),
    };
  }

  // Check if user exists
  if (!data.user) {
    return {
      success: false,
      message: t(lang, "signInFailed"),
    };
  }

  // Success - redirect to home
  redirect("/");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
