import "@/app/_styles/globals.css";
import { Footer } from "@/app/_components/Footer";
import { Sidebar } from "@/app/_components/SideBar";
import { SidebarProvider } from "@/app/_context/SideBarContext";
import { ToastProvider } from "@/app/_components/ToastProvider";
import { AIAssistantProvider } from "@/app/_context/AIAssistantContext";
import type { Metadata } from "next";
import AnimatedMain from "@/app/_components/AnimateMain";
import AIAssistant from "@/app/_components/AIAssistant";
import HeaderServerWrapper from "@/app/_components/HeaderServerWrapper";
import { getLocaleFromParams, Locale, LOCALES } from "../_utils/lang";

export const metadata: Metadata = {
  title: "Major Compass",
  description: "Coming Soon...",
  icons: {
    icon: [
      { url: "/favicon-16x16.svg", sizes: "16x16", type: "image/svg+xml" },
      { url: "/favicon-32x32.svg", sizes: "32x32", type: "image/svg+xml" },
      { url: "/favicon-192x192.svg", sizes: "192x192", type: "image/svg+xml" },
      { url: "/favicon-512x512.svg", sizes: "512x512", type: "image/svg+xml" },
    ],
    apple: [
      {
        url: "/apple-touch-icon-180x180.svg",
        sizes: "180x180",
        type: "image/svg+xml",
      },
    ],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { lang } = await params;
  const locale: Locale = getLocaleFromParams(lang);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`flex flex-col h-screen bg-gray-50 ${locale === "ar" ? "rtl" : "ltr"}`}
      >
        <SidebarProvider>
          <AIAssistantProvider>
            <HeaderServerWrapper lang={lang} />

            <div id="main-scroll" className="flex-1 overflow-y-auto">
              {/* Sidebar + main content row */}
              <div className="flex">
                <Sidebar currentLanguage={locale} />
                <AnimatedMain>{children}</AnimatedMain>
              </div>

              {/* Footer — inside the scroll, full width, below the sidebar row */}
              <Footer lang={locale} />
            </div>

            <AIAssistant />
            <ToastProvider />
          </AIAssistantProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}
