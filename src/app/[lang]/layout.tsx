import { Footer } from "@/app/_components/Footer";
import { Sidebar } from "@/app/_components/SideBar";
import { SidebarProvider } from "@/app/_context/SideBarContext";
import { ToastProvider } from "@/app/_components/ToastProvider";
import { AIAssistantProvider } from "@/app/_context/AIAssistantContext";
import { getLocaleFromParams, Locale, LOCALES } from "../_utils/lang";
import AnimatedMain from "@/app/_components/AnimateMain";
import AIAssistant from "@/app/_components/AIAssistant";
import HeaderServerWrapper from "@/app/_components/HeaderServerWrapper";

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LangLayout({
  children,
  params,
}: LangLayoutProps) {
  const { lang } = await params;
  const locale: Locale = getLocaleFromParams(lang);

  return (
    <div
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`flex flex-col h-screen bg-gray-50 ${
        locale === "ar" ? "rtl" : "ltr"
      }`}
    >
      <SidebarProvider>
        <AIAssistantProvider>
          <HeaderServerWrapper lang={lang} />

          <div
            id="main-scroll"
            className="flex-1 overflow-y-auto overscroll-contain"
          >
            {/* Sidebar + main content row */}
            <div className="flex">
              <Sidebar currentLanguage={locale} />
              <AnimatedMain>{children}</AnimatedMain>
            </div>

            {/* Footer */}
            <Footer lang={locale} />
          </div>

          <AIAssistant />
          <ToastProvider />
        </AIAssistantProvider>
      </SidebarProvider>
    </div>
  );
}

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}
