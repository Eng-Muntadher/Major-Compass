import { createClient } from "../_lib/supabase";
import { getSearchMajors } from "../_lib/supabaseHelpers";
import { getLocaleFromParams } from "../_utils/lang";
import { Header } from "./Header";

async function HeaderServerWrapper({ lang }: { lang: string }) {
  const supabase = await createClient();

  const searchMajors = await getSearchMajors(supabase);

  const locale = getLocaleFromParams(lang);

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
      lang={locale}
      searchMajors={searchMajors}
      userName={userName.data?.username || null}
    />
  );
}

export default HeaderServerWrapper;
