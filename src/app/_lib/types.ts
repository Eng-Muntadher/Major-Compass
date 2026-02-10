// This file has types to describe the data coming from the supabase database

export type EnglishSearchMajors = {
  id: string;
  nameEn: string;
  nameAr: string;
  categoryAr: string;
  categoryEn: string;
};

export type Major = {
  id: string;
  nameAr: string;
  nameEn: string;
  minGPA: number | null;
  difficulty: string | null;
  duration: string | null;
  similarMajors: string[] | null;
  imageUrl: string | null;
  demandInIraqLevel: "High" | "Medium" | "Low" | null;
  demandOutsideIraqLevel: "High" | "Medium" | "Low" | null;

  category: string | null;
  description: string | null;
  skills: string[] | null;
  subjects: string[] | null;
  pros: string[] | null;
  cons: string[] | null;
  jobOpportunities: string[] | null;
  averageSalary: string | null;
  topUniversities: string[] | null;
  commonMistakes: string[] | null;
  demandInIraq: "High" | "Medium" | "Low" | null;
  demandOutsideIraq: "High" | "Medium" | "Low" | null;
};

export type Lang = "en" | "ar";

export type MajorRow = {
  id: string;
  name_ar: string;
  name_en: string;
  min_gpa: number | null;
  difficulty: string | null;
  duration: string | null;
  similar_majors: string[] | null;
  image_url: string | null;
  category_en: string | null;
  demand_in_iraq_level: number | null;
  demand_outside_iraq_level: number | null;

  // language-dependent columns
  [key: string]: unknown;
};

export type MajorNameType = {
  nameEn: string;
  nameAr: string;
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
