/* This file has types for the data when it comes from the supabase (raw)
 and when the data is mapped on (converted from snake case to camel case)
 because in this project I used snake_case for the database and camelCase for the code here */

export type MajorBase = {
  id: string;
  minGPA: number;
  difficulty: "Easy" | "Medium" | "Hard" | "Very Hard";
  duration: string;
  similarMajors: string[];
  imageUrl: string;
  demandInIraqLevel: "High" | "Medium" | "Low";
  demandOutsideIraqLevel: "High" | "Medium" | "Low";
};

export type MajorEN = MajorBase & {
  nameEn: string;
  nameAr: string;
  category: string;
  description: string;
  skills: string[];
  subjects: string[];
  pros: string[];
  cons: string[];
  jobOpportunities: string[];
  averageSalary: string;
  topUniversities: string[];
  commonMistakes: string[] | null;
  demandInIraq: string;
  demandOutsideIraq: string;
};

export type MajorBaseSnake = {
  id: string;
  min_gpa: number;
  difficulty: "Easy" | "Medium" | "Hard" | "Very Hard";
  duration: string;
  similar_majors: string[];
  image_url: string;
  demand_in_iraq_level: string;
  demand_outside_iraq_level: string;
};

export type MajorENSnake = MajorBaseSnake & {
  name_en: string;
  name_ar: string;
  category_en: string;
  description_en: string;
  skills_en: string[];
  subjects_en: string[];
  pros_en: string[];
  cons_en: string[];
  job_opportunities_en: string[];
  average_salary_en: string;
  top_universities_en: string[];
  common_mistakes_en: string[];
  demand_in_iraq_en: string;
  demand_outside_iraq_en: string;
  demand_outside_iraq_level: string;
};

export type MajorAR = MajorBase & {
  name: string;
  category: string;
  description: string;
  skills: string[];
  subjects: string[];
  pros: string[];
  cons: string[];
  jobOpportunities: string[];
  averageSalary: string;
  topUniversities: string[];
  commonMistakes: string[] | null;
  demandInIraq: string;
  demandOutsideIraq: string;
};

export type MajorARSnake = MajorBaseSnake & {
  name_ar: string;
  category_ar: string;
  description_ar: string;
  skills_ar: string[];
  subjects_ar: string[];
  pros_ar: string[];
  cons_ar: string[];
  job_opportunities_ar: string[];
  average_salary_ar: string;
  top_universities_ar: string[];
  common_mistakes_ar: string[] | null;
  demand_in_iraq_ar: string;
  demand_outside_iraq_ar: string;
};

export type EnglishSearchMajors = {
  id: string;
  name: string;
  category: string;
};
