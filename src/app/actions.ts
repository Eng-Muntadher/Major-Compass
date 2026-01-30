"use server";

import { createClient } from "@/app/_lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import OpenAI from "openai";

// This function handles aign up and then creates a new profile in the database
export async function signUpWithEmail(formData: FormData) {
  console.log("SIGN UP ACTION HIT");

  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const grade = formData.get("grade") as string;
  const confirmPassword = formData.get("confirm-password") as string;

  if (password !== confirmPassword) {
    return {
      success: false,
      message: "Please make sure passwords match in both fields!",
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
      message: "An error occurred. Please try again.",
    };
  }

  if (existingProfile) {
    return {
      success: false,
      message:
        "An account with this email already exists. Please log in instead.",
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
          message: "This email or username is already taken.",
        };
      }

      return {
        success: false,
        message:
          "Account created but profile setup failed. Please contact support.",
      };
    }
  }

  return {
    success: true,
    message: "A confirmation link is sent to your email",
  };
}

// This functions redirects to a route handler in "http://localhost:3000/auth/callback" for Google sign up
export async function signUpWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });

  if (error) {
    console.error("Error signing in with Google:", error);
    return;
  }

  if (data?.url) redirect(data.url);
}

export async function signInWithEmail(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validation 1: Check if fields are filled
  if (!email || !password) {
    return {
      success: false,
      message: "Please fill in all fields.",
    };
  }

  // Validation 2: Check if email is valid format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    };
  }

  // Validation 3: Check password length
  if (password.length < 6) {
    return {
      success: false,
      message: "Password must be at least 6 characters long.",
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
        message: "Invalid email or password. Please try again.",
      };
    }

    if (error.message.includes("Email not confirmed")) {
      return {
        success: false,
        message: "Please confirm your email address before signing in.",
      };
    }

    // Generic error fallback
    return {
      success: false,
      message: error.message || "An error occurred during sign in.",
    };
  }

  // Check if user exists
  if (!data.user) {
    return {
      success: false,
      message: "Sign in failed. Please try again.",
    };
  }

  // Success - redirect to home
  redirect("/");
}

export async function continueWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });

  if (error) {
    console.error("Error signing in with Google:", error);
    return { error: error.message };
  }

  if (data?.url) {
    redirect(data.url);
  }
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const username = formData.get("username") as string;
  const avatar_url = formData.get("avatarUrl") as string;
  const grade = formData.get("grade") as string;

  const { error } = await supabase
    .from("profiles")
    .update({
      username,
      avatar_url,
      grade,
    })
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/profile");
  return { success: true };
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export type StudentAIInput = {
  gpa: number;
  highSchoolField: string;
  city: string;
  preferSameCity: "yes" | "no";
  preferredLanguages: string[];
  subjectsStudied: string[];
  preferredFieldType: string;
};

export async function askAI(input: StudentAIInput) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an academic advisor.
                  Please advise me based on the info describing a high school student (me).
                  Your job is to analyze it and give me advice on suitable college fields/majors based on where I live and my intrests.
                  Assume I live in Iraq and the city is determined in the info I sent.`,
      },
      {
        role: "user",
        content: JSON.stringify(input),
      },
    ],
  });

  return completion.choices[0].message.content;
}
