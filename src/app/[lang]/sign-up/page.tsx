import SignUpHeader from "@/app/_components/SignUpHeader";
import SignUpForm from "@/app/_components/SignUpForm";
import { getLocaleFromParams } from "@/app/_utils/lang";
import { getTranslations } from "@/app/translations";

export const metadata = {
  title: "Sign Up | Major Compass",
};

export default async function SignUp({
  params,
}: {
  params: Promise<{ lang: "en" | "ar" }>;
}) {
  const { lang } = await params;
  const locale = getLocaleFromParams(lang);
  const t = getTranslations(locale).signUp;

  return (
    <div className="min-h-screen flex justify-center p-4">
      <div className="w-full max-w-md">
        <SignUpHeader title={t.header.title} text={t.header.text} />
        <SignUpForm translations={t.form} lang={lang} />
      </div>
    </div>
  );
}
