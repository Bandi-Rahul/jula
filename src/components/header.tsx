"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { ranges } from "@/lib/catalogue";
import { locales } from "@/lib/content";
import { languagePath, localeFromPath, translate } from "@/lib/languages";

const links = [
  { href: "/shop", label: "Explore the collection" },
  { href: "/discovery-boxes", label: "Discovery boxes" },
  { href: "/our-story", label: "Our story" },
  { href: "/professionals", label: "For professionals" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = localeFromPath(pathname);
  const french = locale === "fr";
  const t = (text: string) => translate(text, locale);
  const href = (path: string) => languagePath(path, locale);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (open) {
          setOpen(false);
          menuButton.current?.focus();
        }
        document
          .querySelectorAll<HTMLDetailsElement>(".site-header details[open]")
          .forEach((detail) => {
            detail.open = false;
            detail.querySelector("summary")?.focus();
          });
      }
    }
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          href={href("/")}
          className="wordmark"
          aria-label={french ? "Accueil JULA" : "JULA home"}
        >
          JULA
          <span>{french ? "Une maison de boissons" : "A beverage house"}</span>
        </Link>
        <nav
          className="desktop-nav"
          aria-label={french ? "Navigation principale" : "Main navigation"}
        >
          <details className="nav-disclosure">
            <summary>
              {french ? "Explorer" : "Explore"} <ChevronDown size={13} />
            </summary>
            <div className="nav-panel">
              <Link href={href("/shop")}>
                {french ? "Tous les aperçus" : "All development previews"}{" "}
                <ArrowUpRight size={15} />
              </Link>
              {ranges.map((range) => (
                <Link key={range.id} href={href(`/ranges/${range.id}`)}>
                  {range.name}
                  {range.later && (
                    <small>{french ? "Pour plus tard" : "Coming later"}</small>
                  )}
                </Link>
              ))}
            </div>
          </details>
          {links.slice(1).map((link) => (
            <Link
              key={link.href}
              href={href(link.href)}
              aria-current={
                pathname.replace(/\/$/, "") === href(link.href)
                  ? "page"
                  : undefined
              }
            >
              {t(link.label)}
            </Link>
          ))}
        </nav>
        <div className="header-tools">
          <details className="language-picker">
            <summary
              aria-label={french ? "Langue : français" : "Language: English"}
            >
              {french ? "FR" : "EN"} <ChevronDown size={12} />
            </summary>
            <div className="language-panel">
              <p>{french ? "Langue" : "Language"}</p>
              {locales.map((language) => (
                <Link
                  href={
                    language.enabled
                      ? languagePath(pathname, language.code as "en" | "fr")
                      : `/${language.code}`
                  }
                  key={language.code}
                  hrefLang={language.code}
                  aria-current={language.code === locale ? "page" : undefined}
                  onClick={(event) => {
                    if (
                      !language.enabled ||
                      event.ctrlKey ||
                      event.metaKey ||
                      event.shiftKey ||
                      event.altKey
                    )
                      return;
                    event.preventDefault();
                    router.push(
                      `${languagePath(pathname, language.code as "en" | "fr")}${window.location.search}`,
                    );
                    event.currentTarget
                      .closest("details")
                      ?.removeAttribute("open");
                  }}
                >
                  {language.name}
                  <small>
                    {language.code === locale
                      ? french
                        ? "Langue actuelle"
                        : "Current language"
                      : language.enabled
                        ? french
                          ? "Disponible"
                          : "Available"
                        : french
                          ? "Pas encore disponible"
                          : "Not yet available"}
                  </small>
                </Link>
              ))}
            </div>
          </details>
          <Link
            href={href("/shop?focus=search")}
            className="icon-button"
            aria-label={
              french ? "Rechercher dans la collection" : "Search the collection"
            }
            title={
              french ? "Rechercher dans la collection" : "Search the collection"
            }
          >
            <Search size={19} strokeWidth={1.5} />
          </Link>
          <Link
            href={href("/account")}
            className="icon-button account-link"
            aria-label={
              french ? "Disponibilité des comptes" : "Account availability"
            }
            title={
              french
                ? "Les comptes ne sont pas encore disponibles"
                : "Accounts are not yet available"
            }
          >
            <UserRound size={19} strokeWidth={1.5} />
          </Link>
          <Link
            href={href("/bag")}
            className="icon-button"
            aria-label={
              french ? "Disponibilité du panier" : "Shopping bag availability"
            }
            title={
              french
                ? "Les achats ne sont pas encore disponibles"
                : "Purchasing is not yet available"
            }
          >
            <ShoppingBag size={19} strokeWidth={1.5} />
          </Link>
          <button
            ref={menuButton}
            className="icon-button mobile-menu-button"
            aria-label={
              french
                ? open
                  ? "Fermer la navigation"
                  : "Ouvrir la navigation"
                : open
                  ? "Close navigation"
                  : "Open navigation"
            }
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          className="mobile-nav"
          id="mobile-navigation"
          aria-label={french ? "Navigation mobile" : "Mobile navigation"}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={href(link.href)}
              onClick={() => setOpen(false)}
            >
              {t(link.label)}
              <ArrowUpRight size={18} />
            </Link>
          ))}
          <div className="mobile-range-links">
            {ranges.map((range) => (
              <Link
                key={range.id}
                href={href(`/ranges/${range.id}`)}
                onClick={() => setOpen(false)}
              >
                {range.name}
                {range.later ? (french ? " · Plus tard" : " · Later") : ""}
              </Link>
            ))}
          </div>
          <Link href={href("/contact")} onClick={() => setOpen(false)}>
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
