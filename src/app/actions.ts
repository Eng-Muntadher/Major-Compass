"use server";

export type StudentAIInput = {
  gpa: number;
  highSchoolField: string;
  city: string;
  preferSameCity: "yes" | "no";
  preferredLanguages: string[];
  subjectsStudied: string[];
  preferredFieldType: string;
};

export interface RecentlySavedMajor {
  id: string;
  nameEn: string;
  nameAr: string;
  difficulty: string;
  minGPA: number;
}

export interface RecentlyViewedMajor {
  id: string;
  nameEn: string;
  nameAr: string;
}

interface AIMessage {
  role: "user" | "assistant";
  content: string;
}

import { createClient } from "@/app/_lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import OpenAI from "openai";
import { MajorEN } from "./_lib/types";

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
  const grade = formData.get("grade") as string;
  const avatarFile = formData.get("avatar");

  let avatar_url: string | null = null;

  // Only upload if the user actually picked a new file.
  // formData.get returns null if the key is missing, or a string if it's
  // a text field — neither of which is a File.
  if (avatarFile instanceof File) {
    const extension = avatarFile.name.split(".").pop();

    // Delete whatever is in this user's folder first.
    const { error: listError, data: existingFiles } = await supabase.storage
      .from("avatars")
      .list(user.id);

    if (listError) {
      return { error: `Failed to list existing avatars: ${listError.message}` };
    }

    if (existingFiles && existingFiles.length > 0) {
      const paths = existingFiles.map((file) => `${user.id}/${file.name}`);
      const { error: deleteError } = await supabase.storage
        .from("avatars")
        .remove(paths);

      if (deleteError) {
        return { error: `Failed to delete old avatar: ${deleteError.message}` };
      }
    }

    // Now upload the new one.
    const { data, error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(`${user.id}/avatar.${extension}`, avatarFile);

    if (uploadError) {
      return { error: `Failed to upload avatar: ${uploadError.message}` };
    }

    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(data.path);

    avatar_url = `${urlData.publicUrl}?t=${Date.now()}`;
  }

  // Build the update object. Only include avatar_url if a new one was uploaded,
  // otherwise leave the existing value in the DB untouched.
  const updates: Record<string, string | null> = { username, grade };
  if (avatar_url) {
    updates.avatar_url = avatar_url;
  }

  const { error } = await supabase
    .from("profiles")
    .update(updates)
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

export async function sendMessage(messages: AIMessage[]) {
  try {
    if (!messages || !Array.isArray(messages)) {
      throw new Error("Invalid messages format");
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      temperature: 0.7,
      max_tokens: 1000,
    });

    return {
      success: true,
      message: completion.choices[0].message.content,
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    return {
      success: false,
      message: "Sorry, I encountered an error. Please try again.",
    };
  }
}

export async function toggleBookmarkAction(majorId: string) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user || authError) {
    return { ok: false, error: "NOT_AUTHENTICATED" };
  }

  // Get current bookmarks
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("bookmarks")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error(profileError);
    return { ok: false, error: "PROFILE_FETCH_FAILED" };
  }

  const bookmarks: string[] = profile.bookmarks ?? [];

  const isBookmarked = bookmarks.includes(majorId);

  const updatedBookmarks = isBookmarked
    ? bookmarks.filter((id) => id !== majorId)
    : [...bookmarks, majorId];

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ bookmarks: updatedBookmarks })
    .eq("id", user.id);

  if (updateError) {
    console.error(updateError);
    return { ok: false, error: "UPDATE_FAILED" };
  }

  return {
    ok: true,
    bookmarked: !isBookmarked,
  };
}

export async function getBookmarkedMajors(
  majorIds: string[],
): Promise<MajorEN[]> {
  if (!majorIds || majorIds.length === 0) return [];

  const supabase = await createClient();

  const { data: majors, error } = await supabase
    .from("majors")
    .select("*")
    .in("id", majorIds); // filter by array of IDs

  if (error) {
    console.error("Error fetching bookmarked majors:", error);
    return [];
  }

  return majors.map((major) => ({
    id: major.id,
    nameEn: major.name_en,
    nameAr: major.name_ar,
    category: major.category_en,
    description: major.description_en,
    minGPA: major.min_gpa,
    difficulty: major.difficulty,
    duration: major.duration,
    skills: major.skills_en,
    subjects: major.subjects_en,
    pros: major.pros_en,
    cons: major.cons_en,
    jobOpportunities: major.job_opportunities_en,
    averageSalary: major.average_salary_en,
    similarMajors: major.similar_majors,
    topUniversities: major.top_universities_en,
    imageUrl: major.image_url,
    commonMistakes: major.common_mistakes_en,
    demandInIraq: major.demand_in_iraq_en,
    demandOutsideIraq: major.demand_outside_iraq_en,
    demandInIraqLevel: major.demand_in_iraq_level,
    demandOutsideIraqLevel: major.demand_outside_iraq_level,
  }));
}

export async function getRecentlySaved(
  majorIds: string[],
): Promise<RecentlySavedMajor[]> {
  if (!majorIds || majorIds.length === 0) return [];

  const supabase = await createClient();

  // Get only the last 2 IDs
  const lastTwoIds = majorIds.slice(-2);

  const { data: majors, error } = await supabase
    .from("majors")
    .select("id, name_en, name_ar, difficulty, min_gpa")
    .in("id", lastTwoIds);

  if (error) {
    console.error("Error fetching bookmarked majors:", error);
    return [];
  }

  return majors.map((major) => ({
    id: major.id,
    nameEn: major.name_en,
    nameAr: major.name_ar,
    difficulty: major.difficulty,
    minGPA: major.min_gpa,
  }));
}

export async function getRecentlyViwed(
  majorIds: string[],
): Promise<RecentlyViewedMajor[]> {
  if (!majorIds || majorIds.length === 0) return [];

  const supabase = await createClient();

  const { data: majors, error } = await supabase
    .from("majors")
    .select("id, name_en, name_ar")
    .in("id", [majorIds]);

  if (error) {
    console.error("Error fetching bookmarked majors:", error);
    return [];
  }

  return majors.map((major) => ({
    id: major.id,
    nameEn: major.name_en,
    nameAr: major.name_ar,
  }));
}

export async function updateRecentlyViewedMajor(majorId: string | undefined) {
  if (!majorId) return;

  const supabase = await createClient();

  // Get authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    // Not logged in → silently ignore
    return;
  }

  // Fetch current recently_viewed
  const { data, error: fetchError } = await supabase
    .from("profiles")
    .select("recently_viewed")
    .eq("id", user.id)
    .single();

  if (fetchError) {
    console.error("Error fetching recently viewed:", fetchError);
    return;
  }

  const current: string[] = data?.recently_viewed ?? [];

  // Remove if already exists
  const filtered = current.filter((id) => id !== majorId);

  // Push new one to the end
  filtered.push(majorId);

  // Keep max length 3
  const updated = filtered.slice(-3);

  // Update DB
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ recently_viewed: updated })
    .eq("id", user.id);

  if (updateError) {
    console.error("Error updating recently viewed:", updateError);
  }
}
