/* ENGLISH TRANSLATIONS INDEX:
 * Aggregates all English translation files into a single object.
 * This serves as the central export point for all English content in the app.
 */

// Import individual translation modules for each page/section
import home from "./home";
import about from "./about";
import tips from "./tips";
import savedMajors from "./savedMajors";
import studentTest from "./studentTest";
import profile from "./profile";
import majorDetails from "./majorDetails";
import compare from "./compare";
import signIn from "./signIn";
import signUp from "./signUp";
import footer from "./footer";

// Combine all translation modules into a single object.
const en = {
  home,
  about,
  tips,
  savedMajors,
  studentTest,
  profile,
  majorDetails,
  compare,
  signIn,
  signUp,
  footer,
} as const;

export default en;
