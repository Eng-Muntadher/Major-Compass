import { Footer } from "@/app/_components/Footer";
import { Sidebar } from "@/app/_components/SideBar";
import { SidebarProvider } from "@/app/_context/SideBarContext";
import { ToastProvider } from "@/app/_components/ToastProvider";
import { AIAssistantProvider } from "@/app/_context/AIAssistantContext";
import { getLocaleFromParams, Locale, LOCALES } from "../_utils/lang";
import AnimatedMain from "@/app/_components/AnimateMain";
import AIAssistant from "@/app/_components/AIAssistant";
import Header from "@/app/_components/Header";
import { ScrollRestoration } from "../_components/ScrollRestoration";
import { Suspense } from "react";

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
      className={`flex flex-col h-screen overflow-hidden bg-gray-50 ${
        locale === "ar" ? "rtl" : "ltr"
      }`}
    >
      {/* Since my app has multi-language support,
       I had very hard aligment issues with the page. This scroll component helps solves them! */}
      <Suspense fallback={<div className="w-10"></div>}>
        <ScrollRestoration />
      </Suspense>

      <SidebarProvider>
        <AIAssistantProvider>
          {/* Header */}
          <Header lang={lang as "en" | "ar"} />

          {/* Main + SideBar */}
          <div
            id="main-scroll"
            className="flex-1 overflow-y-auto overscroll-contain"
          >
            {/* Sidebar + main content row */}
            <div className="flex min-w-0">
              <Suspense
                fallback={<div className="h-dvh w-40 fixed left-0"></div>}
              >
                <Sidebar currentLanguage={locale} />
              </Suspense>
              <AnimatedMain>{children}</AnimatedMain>
            </div>

            {/* Footer */}
            <Footer lang={locale} />
          </div>

          {/* AI Floating Button + Toast Provider */}
          <AIAssistant />
          <ToastProvider />
        </AIAssistantProvider>
      </SidebarProvider>
    </div>
  );
}

// Make the layout static server rendered
export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}
