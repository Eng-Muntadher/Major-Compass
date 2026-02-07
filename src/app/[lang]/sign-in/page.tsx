import { getLocaleFromParams } from "@/app/_utils/lang";
import { getTranslations } from "@/app/translations";
import SignInForm from "@/app/_components/SignInForm";
import SignUpHeader from "@/app/_components/SignUpHeader";

export const metadata = {
  title: "Sign In | Major Compass",
};

export default async function SignIn({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  const { lang } = await params;
  const locale = getLocaleFromParams(lang);
  const t = getTranslations(locale).signIn;

  return (
    <div className="min-h-screen flex justify-center p-4">
      <div className="w-full max-w-md">
        <SignUpHeader title={t.header.title} text={t.header.text} />
        <SignInForm translations={t.form} lang={lang} />
      </div>
    </div>
  );
}
