import { createClient } from "../_lib/supabase";
import { getEnSearchMajors } from "../_lib/supabaseHelpers";
import { Header } from "./Header";

export const revalidate = 60;

async function HeaderServerWrapper() {
  const supabase = await createClient();
  const searchMajors = await getEnSearchMajors(supabase);

  return <Header searchMajors={searchMajors} />;
}

export default HeaderServerWrapper;
