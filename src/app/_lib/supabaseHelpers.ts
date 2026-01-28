import { SupabaseClient } from "@supabase/supabase-js";
import { EnglishSearchMajors, MajorAR, MajorEN } from "./types";

export async function getMajorsInEnglish(
  supabase: SupabaseClient,
  ids?: string[],
): Promise<MajorEN[] | null> {
  let query = supabase.from("majors").select(`
      id,
      name_en,
      name_ar,
      category_en,
      description_en,
      min_gpa,
      difficulty,
      duration,
      skills_en,
      subjects_en,
      pros_en,
      cons_en,
      job_opportunities_en,
      average_salary_en,
      similar_majors,
      top_universities_en,
      image_url,
      common_mistakes_en,
      demand_in_iraq_en,
      demand_outside_iraq_en,
      demand_in_iraq_level,
      demand_outside_iraq_level
    `);

  // Apply filter ONLY if ids exist and are not empty, otherwise we return all the data in the DB
  if (ids && ids.length > 0) {
    query = query.in("id", ids);
  }

  const { data, error } = await query;

  if (error || !data) {
    console.error("Error fetching English majors:", error);
    return null;
  }

  return data.map((major) => ({
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

export async function getMajorsInArabic(
  supabase: SupabaseClient,
  ids?: string[],
): Promise<MajorAR[] | null> {
  let query = supabase.from("majors").select(`
    id,
    name_ar,
    category_ar,
    description_ar,
    min_gpa,
    difficulty,
    duration,
    skills_ar,
    subjects_ar,
    pros_ar,
    cons_ar,
    job_opportunities_ar,
    average_salary_ar,
    similar_majors,
    top_universities_ar,
    image_url,
    common_mistakes_ar,
    demand_in_iraq_ar,
    demand_outside_iraq_ar,
    demand_in_iraq_level,
    demand_outside_iraq_level
  `);

  // ✅ Apply filter ONLY if ids exist and are not empty
  if (ids && ids.length > 0) {
    query = query.in("id", ids);
  }

  const { data, error } = await query;

  if (error || !data) {
    console.error("Error fetching Arabic majors:", error);
    return null;
  }

  return data.map((major) => ({
    id: major.id,
    name: major.name_ar,
    category: major.category_ar,
    description: major.description_ar,
    minGPA: major.min_gpa,
    difficulty: major.difficulty,
    duration: major.duration,
    skills: major.skills_ar,
    subjects: major.subjects_ar,
    pros: major.pros_ar,
    cons: major.cons_ar,
    jobOpportunities: major.job_opportunities_ar,
    averageSalary: major.average_salary_ar,
    similarMajors: major.similar_majors,
    topUniversities: major.top_universities_ar,
    imageUrl: major.image_url,
    commonMistakes: major.common_mistakes_ar,
    demandInIraq: major.demand_in_iraq_ar,
    demandOutsideIraq: major.demand_outside_iraq_ar,
    demandInIraqLevel: major.demand_in_iraq_level,
    demandOutsideIraqLevel: major.demand_outside_iraq_level,
  }));
}

export async function getEnSearchMajors(
  supabase: SupabaseClient,
): Promise<EnglishSearchMajors[] | null> {
  const { data, error } = await supabase
    .from("majors")
    .select("id, name_en, category_en");

  if (error || !data) {
    console.error("Error fetching Arabic majors:", error);
    return null;
  }

  return data.map((major) => ({
    id: major.id,
    name: major.name_en,
    category: major.category_en,
  }));
}

export async function getSimilarMajorsInEnglish(
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
