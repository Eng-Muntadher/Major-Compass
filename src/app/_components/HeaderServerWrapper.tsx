import { createClient } from "../_lib/supabase";
import { getEnSearchMajors } from "../_lib/supabaseHelpers";
import { Header } from "./Header";

async function HeaderServerWrapper() {
  const supabase = await createClient();

  const searchMajors = await getEnSearchMajors(supabase);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userName = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user?.id)
    .single();

  return (
    <Header
      searchMajors={searchMajors}
      userName={userName.data?.username || null}
    />
  );
}

export default HeaderServerWrapper;
