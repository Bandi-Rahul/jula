import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "./globals.css";
import "../styles/pages.css";
import { assetPath } from "@/lib/hosting";

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
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
