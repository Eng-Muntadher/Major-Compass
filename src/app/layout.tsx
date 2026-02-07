import "@/app/_styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Major Compass",
  description:
    "AI-powered platform helping students discover their ideal college major. Get personalized recommendations, compare programs, and make informed decisions about your academic future with intelligent guidance.",
  applicationName: "Major Compass",
  keywords: [
    "college major",
    "career guidance",
    "AI career advisor",
    "university programs",
    "major selection",
    "student guidance",
    "academic counseling",
    "college planning",
    "major recommendations",
    "Iraqi universities",
    "higher education",
    "career planning",
  ],
  authors: [
    {
      name: "Muntadher Ahmed",
      url: "https://muntadher-ahmed.vercel.app",
    },
  ],
  creator: "Muntadher Ahmed",
  publisher: "Major Compass",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://my-major-compass.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      ar: "/ar",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_IQ"],
    url: "https://my-major-compass.vercel.app",
    siteName: "Major Compass",
    title: "Major Compass - Find Your Perfect College Major",
    description:
      "AI-powered platform helping students discover their ideal college major with personalized recommendations and intelligent guidance.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Major Compass - AI-Powered College Major Guidance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Major Compass - Find Your Perfect College Major",
    description:
      "AI-powered platform helping students discover their ideal college major with personalized recommendations.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Major Compass",
  },
  category: "education",
  classification: "Education, Career Guidance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
