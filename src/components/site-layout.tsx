import type { Metadata } from "next";
import { Header } from "./header";
import { Footer } from "./footer";
import type { Locale } from "@/lib/languages";
import { assetPath } from "@/lib/hosting";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@/app/globals.css";
import "@/styles/pages.css";

export const metadata: Metadata = {
  title: {
    default: "JULA | A beverage house, in the making",
    template: "%s | JULA",
  },
  description:
    "A pre-launch beverage house in Liège, Belgium. Explore teas, herbal infusions, lattes, cacao, coffee and floral drink concepts.",
  robots: {
    index: process.env.ALLOW_INDEXING === "true",
    follow: process.env.ALLOW_INDEXING === "true",
  },
  metadataBase: process.env.SITE_URL
    ? new URL(process.env.SITE_URL)
    : undefined,
  alternates: process.env.SITE_URL
    ? {
        canonical: assetPath("/"),
        languages: { en: assetPath("/"), fr: assetPath("/fr") },
      }
    : undefined,
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "JULA",
    title: "JULA | A beverage house, in the making",
    description:
      "Distinct drinks. A little curiosity. A cup worth returning to.",
    images: process.env.SITE_URL
      ? [
          {
            url: assetPath("/images/tea-ritual.webp"),
            alt: "Contextual tea photography",
          },
        ]
      : undefined,
  },
};

export function SiteLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return (
    <html lang={locale}>
      <body>
        <a href="#main-content" className="skip-link">
          {locale === "fr" ? "Aller au contenu" : "Skip to content"}
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
