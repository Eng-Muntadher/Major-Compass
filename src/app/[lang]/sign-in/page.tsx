import { getLocaleFromParams } from "@/app/_utils/lang";
import { getTranslations } from "@/app/translations";
import SignInForm from "@/app/_components/SignInForm";
import SignUpHeader from "@/app/_components/SignUpHeader";
import { Suspense } from "react";

export const metadata = {
  title: "Sign In | Major Compass",
};

export default async function SignIn({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  // Get the current language from the params
  const { lang } = await params;

  // Validate types and get the translation for this page (Arabic / English)
  const locale = getLocaleFromParams(lang);
  const t = getTranslations(locale).signIn;

  return (
    <div className="min-h-screen flex justify-center p-4">
      <div className="w-full max-w-md">
        {/* I reused the same header from the sign up page */}
        <SignUpHeader title={t.header.title} text={t.header.text} />
        {/* We use suspense because we have a useSearchParams here */}
        <Suspense
          fallback={<div className="text-center py-10">Loading...</div>}
        >
          <SignInForm translations={t.form} lang={lang} />
        </Suspense>
      </div>
    </div>
  );
}
