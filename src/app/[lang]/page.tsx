import { redirect } from "next/navigation";
import { getLocaleFromParams } from "@/app/_utils/lang";

export default async function LangRootPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = getLocaleFromParams(lang);

  // Redirect /en or /ar to /en/home or /ar/home
  redirect(`/${locale}/home`);
}
