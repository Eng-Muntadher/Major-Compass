/**
 * SUPABASE DATABASE HELPERS:
 * Provides reusable functions to fetch major data from Supabase.
 * Handles language-specific fields (Arabic/English) and transforms database
 * rows into typed Major objects.
 */

import { SupabaseClient } from "@supabase/supabase-js";
import {
  EnglishSearchMajors,
  Lang,
  Major,
  MajorNameType,
  MajorRow,
  RecentlySavedMajor,
  RecentlyViewedMajor,
} from "./types";

export async function getMajors(
  supabase: SupabaseClient,
  lang: Lang = "en",
  ids?: string[],
): Promise<Partial<Major>[] | null> {
  // Map to language-specific column names
  const fieldMap = {
    description: `description_${lang}` as const,
    jobOpportunities: `job_opportunities_${lang}` as const,
  };

  const selectFields = [
    "id",
    "name_ar",
    "name_en",
    "difficulty",
    "image_url",
    "min_gpa",
    "duration",
    "category_en",
    fieldMap.description,
    fieldMap.jobOpportunities,
  ].join(", ");

  let query = supabase.from("majors").select(selectFields);

  if (ids !== undefined && ids.length > 0) {
    query = query.in("id", ids);
  } else if (ids !== undefined && ids.length === 0) {
    // Empty array means "match nothing" - return early
    return [];
  }

  const { data, error } = await query.returns<MajorRow[]>();

  if (error || !data) {
    console.error(`Error fetching majors in ${lang}:`, error);
    return null;
  }

  // Transform database rows to typed Major objects
  return data.map((major) => ({
    id: major.id,
    nameEn: major.name_en,
    nameAr: major.name_ar,
    category: major.category_en,
    difficulty: major.difficulty,
    imageUrl: major.image_url,
    description: major[fieldMap.description] as string | null,
    minGPA: major.min_gpa,
    duration: major.duration,
    jobOpportunities: major[fieldMap.jobOpportunities] as string[] | null,
  }));
}

export async function getMajorName(
  supabase: SupabaseClient,
  lang: "en" | "ar",
  majorId: string,
): Promise<MajorNameType | null> {
  const { data, error } = await supabase
    .from("majors")
    .select(`name_en, name_ar`)
    .eq("id", majorId)
    .single();

  if (error || !data) return null;
  return lang === "ar" ? data.name_ar : data.name_en;
}

export async function getMajorsWithFullInfo(
  supabase: SupabaseClient,
  lang: Lang = "en",
): Promise<Major[] | null> {
  // Dynamically build the fetched data based on the current language (fetch only what's needed)
  const fieldMap = {
    category: `category_${lang}` as const,
    description: `description_${lang}` as const,
    skills: `skills_${lang}` as const,
    subjects: `subjects_${lang}` as const,
    pros: `pros_${lang}` as const,
    cons: `cons_${lang}` as const,
    jobOpportunities: `job_opportunities_${lang}` as const,
    averageSalary: `average_salary_${lang}` as const,
    topUniversities: `top_universities_${lang}` as const,
    commonMistakes: `common_mistakes_${lang}` as const,
    demandInIraq: `demand_in_iraq_${lang}` as const,
    demandOutsideIraq: `demand_outside_iraq_${lang}` as const,
  };

  const selectFields = [
    "id",
    "name_ar",
    "name_en",
    fieldMap.category,
    fieldMap.description,
    "min_gpa",
    "difficulty",
    "duration",
    fieldMap.skills,
    fieldMap.subjects,
    fieldMap.pros,
    fieldMap.cons,
    fieldMap.jobOpportunities,
    fieldMap.averageSalary,
    "similar_majors",
    fieldMap.topUniversities,
    "image_url",
    fieldMap.commonMistakes,
    fieldMap.demandInIraq,
    fieldMap.demandOutsideIraq,
    "demand_in_iraq_level",
    "demand_outside_iraq_level",
  ].join(", ");

  const { data, error } = await supabase
    .from("majors")
    .select(selectFields)
    .returns<MajorRow[]>();

  if (error || !data) {
    console.error(`Error fetching majors in ${lang}:`, error);
    return null;
  }

  return data.map((major) => {
    const get = <T = unknown>(key: string) => major[key] as T;

    return {
      id: major.id,
      nameAr: major.name_ar,
      nameEn: major.name_en,
      minGPA: major.min_gpa,
      difficulty: major.difficulty,
      duration: major.duration,
      similarMajors: major.similar_majors,
      imageUrl: major.image_url,
      demandOutsideIraqLevel: major.demand_outside_iraq_level?.toString() as
        | "High"
        | "Medium"
        | "Low"
        | null,
      demandInIraqLevel: major.demand_in_iraq_level?.toString() as
        | "High"
        | "Medium"
        | "Low"
        | null,
      category: get(fieldMap.category),
      description: get(fieldMap.description),
      skills: get(fieldMap.skills),
      subjects: get(fieldMap.subjects),
      pros: get(fieldMap.pros),
      cons: get(fieldMap.cons),
      jobOpportunities: get(fieldMap.jobOpportunities),
      averageSalary: get(fieldMap.averageSalary),
      topUniversities: get(fieldMap.topUniversities),
      commonMistakes: get(fieldMap.commonMistakes),
      demandInIraq: get(fieldMap.demandInIraq),
      demandOutsideIraq: get(fieldMap.demandOutsideIraq),
    };
  });
}

export async function getMajorDetails(
  supabase: SupabaseClient,
  lang: Lang = "en",
  id: string,
): Promise<Major | null> {
  const fieldMap = {
    category: `category_${lang}` as const,
    description: `description_${lang}` as const,
    skills: `skills_${lang}` as const,
    subjects: `subjects_${lang}` as const,
    pros: `pros_${lang}` as const,
    cons: `cons_${lang}` as const,
    jobOpportunities: `job_opportunities_${lang}` as const,
    averageSalary: `average_salary_${lang}` as const,
    topUniversities: `top_universities_${lang}` as const,
    commonMistakes: `common_mistakes_${lang}` as const,
    demandInIraq: `demand_in_iraq_${lang}` as const,
    demandOutsideIraq: `demand_outside_iraq_${lang}` as const,
  };

  const selectFields = [
    "id",
    "name_ar",
    "name_en",
    fieldMap.category,
    fieldMap.description,
    "min_gpa",
    "difficulty",
    "duration",
    fieldMap.skills,
    fieldMap.subjects,
    fieldMap.pros,
    fieldMap.cons,
    fieldMap.jobOpportunities,
    fieldMap.averageSalary,
    "similar_majors",
    fieldMap.topUniversities,
    "image_url",
    fieldMap.commonMistakes,
    fieldMap.demandInIraq,
    fieldMap.demandOutsideIraq,
    "demand_in_iraq_level",
    "demand_outside_iraq_level",
  ].join(", ");

  const { data, error } = await supabase
    .from("majors")
    .select(selectFields)
    .eq("id", id)
    .single<MajorRow>();

  if (error || !data) {
    console.error(`Error fetching major with id=${id} in ${lang}:`, error);
    return null;
  }

  const get = <T = unknown>(key: string) => data[key] as T;

  return {
    id: data.id,
    nameAr: data.name_ar,
    nameEn: data.name_en,
    minGPA: data.min_gpa,
    difficulty: data.difficulty,
    duration: data.duration,
    similarMajors: data.similar_majors,
    imageUrl: data.image_url,
    demandOutsideIraqLevel:
      (data.demand_outside_iraq_level?.toString() as
        | "High"
        | "Medium"
        | "Low") || null,
    demandInIraqLevel:
      (data.demand_in_iraq_level?.toString() as "High" | "Medium" | "Low") ||
      null,
    category: get(fieldMap.category),
    description: get(fieldMap.description),
    skills: get(fieldMap.skills),
    subjects: get(fieldMap.subjects),
    pros: get(fieldMap.pros),
    cons: get(fieldMap.cons),
    jobOpportunities: get(fieldMap.jobOpportunities),
    averageSalary: get(fieldMap.averageSalary),
    topUniversities: get(fieldMap.topUniversities),
    commonMistakes: get(fieldMap.commonMistakes),
    demandInIraq: get(fieldMap.demandInIraq),
    demandOutsideIraq: get(fieldMap.demandOutsideIraq),
  };
}

/**
 * Get the 2 most recently bookmarked majors for display in profile.
 */
export async function getRecentlySavedMajors(
  supabase: SupabaseClient,
  majorIds: string[],
): Promise<RecentlySavedMajor[]> {
  if (!majorIds || majorIds.length === 0) return [];

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

export async function getRecentlyViwedMajors(
  supabase: SupabaseClient,
  majorIds: string[],
): Promise<RecentlyViewedMajor[]> {
  if (!majorIds || majorIds.length === 0) return [];

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

/**
 * Get minimal major data (names + categories) for search functionality.
 */
export async function getSearchMajors(
  supabase: SupabaseClient,
): Promise<EnglishSearchMajors[] | null> {
  const { data, error } = await supabase
    .from("majors")
    .select("id, name_en, category_en, name_ar, category_ar");

  if (error || !data) {
    console.error("Error fetching Arabic majors:", error);
    return null;
  }

  return data.map((major) => ({
    id: major.id,
    nameAr: major.name_ar,
    nameEn: major.name_en,
    categoryAr: major.category_ar,
    categoryEn: major.category_en,
  }));
}

export async function getSimilarMajors(
  supabase: SupabaseClient,
  ids: string[],
) {
  const query = supabase
    .from("majors")
    .select("id,name_en, name_ar, min_gpa")
    .in("id", ids);

  const { data, error } = await query;

  if (error || !data) {
    console.error("Error fetching English majors:", error);
    return null;
  }

  return data.map((major) => ({
    id: major.id,
    nameEn: major.name_en,
    nameAr: major.name_ar,
    minGPA: major.min_gpa,
  }));
}
