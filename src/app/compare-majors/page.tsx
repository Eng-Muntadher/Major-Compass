import CompareHeader from "../_components/CompareHeader";
import CompareMajorsClientWrapper from "../_components/CompareMajorsClientWrapper";
import { createClient } from "../_lib/supabase";
import { getMajorsInEnglish } from "../_lib/supabaseHelpers";

export const revalidate = 60;

export default async function CompareMajors() {
  const supabase = await createClient();
  const majors = await getMajorsInEnglish(supabase);

  return (
    <div className="max-w-7xl mx-auto">
      <CompareHeader />
      <CompareMajorsClientWrapper majors={majors} />
    </div>
  );
}
