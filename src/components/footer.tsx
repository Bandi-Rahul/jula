"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { languagePath, localeFromPath, translate } from "@/lib/languages";

const groups = [
  {
    title: "Discover",
    links: [
      ["The collection", "/shop"],
      ["Discovery boxes", "/discovery-boxes"],
      ["Prepare JULA", "/preparation"],
      ["Passport preview", "/passport"],
    ],
  },
  {
    title: "The house",
    links: [
      ["Our story", "/our-story"],
      ["Origins & producers", "/origins"],
      ["Our commitments", "/commitments"],
      ["For professionals", "/professionals"],
    ],
  },
  {
    title: "Here to help",
    links: [
      ["Contact", "/contact"],
      ["Questions & answers", "/faq"],
      ["Shipping & delivery", "/shipping"],
      ["Returns & refunds", "/returns"],
    ],
  },
];

export function Footer() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const french = locale === "fr";
  const t = (text: string) => translate(text, locale);
  return (
    <footer className="site-footer">
      <div className="footer-top wrap">
        <div className="footer-brand">
          <Link href={languagePath("/", locale)} className="wordmark">
            JULA
          </Link>
          <p>
            {french ? "Un peu de curiosité." : "A little curiosity."}
            <br />
            {french
              ? "Une tasse à laquelle on revient."
              : "A cup worth returning to."}
          </p>
          <span>
            {french
              ? "Liège, Belgique · Pré-lancement"
              : "Liège, Belgium · Pre-launch"}
          </span>
        </div>
        {groups.map((group) => (
          <div className="footer-group" key={group.title}>
            <h2>{t(group.title)}</h2>
            {group.links.map(([label, href]) => (
              <Link key={href} href={languagePath(href, locale)}>
                {t(label)}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="footer-bottom wrap">
        <span>© {new Date().getFullYear()} JULA</span>
        <div>
          {["privacy", "terms", "cookies", "accessibility"].map(
            (path, index) => (
              <Link key={path} href={languagePath(`/${path}`, locale)}>
                {t(
                  ["Privacy", "Terms", "Cookie preferences", "Accessibility"][
                    index
                  ],
                )}
              </Link>
            ),
          )}
        </div>
        <Link
          href={languagePath(pathname, french ? "en" : "fr")}
          hrefLang={french ? "en" : "fr"}
        >
          {french ? "English" : "Français"} <ArrowUpRight size={13} />
        </Link>
      </div>
      <p className="footer-disclaimer wrap">
        {french
          ? "Les aperçus de développement ne sont pas des offres de vente. Informations juridiques et politiques commerciales restent à vérifier."
          : "Development previews are not offers for sale. Legal business details and commercial policies await review."}
      </p>
    </footer>
  );
}
