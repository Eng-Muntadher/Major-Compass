"use server";

import { createClient } from "@/app/_lib/supabase";
import { redirect } from "next/navigation";
import { t, type Lang } from "./actionsTranslation";

// This function handles email sign up and then creates a new profile in the database
export async function signUpWithEmail(formData: FormData, lang: Lang = "en") {
  // Get the form data
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const grade = formData.get("grade") as string;
  const confirmPassword = formData.get("confirm-password") as string;

  // Validate passowrd
  if (password !== confirmPassword) {
    return {
      success: false,
      message: t(lang, "passwordMismatch"),
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: t(lang, "invalidEmail"),
    };
  }

  const supabase = await createClient();

  // Step 1: Check if email already exists in profiles
  const { data: existingProfile, error: checkError } = await supabase
    .from("profiles")
    .select("email")
    .eq("email", email)
    .maybeSingle();

  if (existingProfile) {
    return {
      success: false,
      message: t(lang, "emailExists"),
    };
  }

  if (checkError && checkError.code !== "PGRST116") {
    // PGRST116 is "no rows returned" which is fine
    console.error("Error checking email:", checkError);
    // Give an error with the current user's language to be shown in a toast
    return {
      success: false,
      message: t(lang, "errorOccurred"),
    };
  }

  // Step 2: Sign up the user
  const { data: authData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "https://my-major-compass.vercel.app/auth/callback",
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

// This function handles email sign in and catches edge cases (like email not confirmed)
export async function signInWithEmail(
  formData: FormData,
  lang: Lang = "en",
  redirectUrl: string = "/",
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, message: t(lang, "fillAllFields") };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: t(lang, "invalidEmail") };
  }

  if (password.length < 6) {
    return { success: false, message: t(lang, "passwordTooShort") };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Sign in error:", error);

    if (error.message.includes("Invalid login credentials")) {
      return { success: false, message: t(lang, "invalidCredentials") };
    }

    if (error.message.includes("Email not confirmed")) {
      return { success: false, message: t(lang, "emailNotConfirmed") };
    }

    return {
      success: false,
      message: error.message || t(lang, "errorOccurred"),
    };
  }

  if (!data.user) {
    return { success: false, message: t(lang, "signInFailed") };
  }

  // Success - redirect to provided redirectUrl
  redirect(redirectUrl);
}

// sign out and redirect function
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
