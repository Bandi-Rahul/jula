"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

const links = [
  { href: "/shop", label: "Explore the collection" },
  { href: "/discovery-boxes", label: "Discovery boxes" },
  { href: "/our-story", label: "Our story" },
  { href: "/professionals", label: "For professionals" },
];

export function Header() {
  const pathname = usePathname();
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
        <Link href="/" className="wordmark" aria-label="JULA home">
          JULA<span>A beverage house</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <details className="nav-disclosure">
            <summary>
              Explore <ChevronDown size={13} />
            </summary>
            <div className="nav-panel">
              <Link href="/shop">
                All development previews <ArrowUpRight size={15} />
              </Link>
              {ranges.map((range) => (
                <Link key={range.id} href={`/ranges/${range.id}`}>
                  {range.name}
                  {range.later && <small>Coming later</small>}
                </Link>
              ))}
            </div>
          </details>
          {links.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-tools">
          <details className="language-picker">
            <summary aria-label="Language: English">
              EN <ChevronDown size={12} />
            </summary>
            <div className="language-panel">
              <p>Language</p>
              {locales.map((locale) => (
                <Link
                  href={locale.enabled ? pathname : `/${locale.code}`}
                  key={locale.code}
                >
                  {locale.name}
                  <small>
                    {locale.enabled ? "Current language" : "Not yet available"}
                  </small>
                </Link>
              ))}
            </div>
          </details>
          <Link
            href="/shop?focus=search"
            className="icon-button"
            aria-label="Search the collection"
            title="Search the collection"
          >
            <Search size={19} strokeWidth={1.5} />
          </Link>
          <Link
            href="/account"
            className="icon-button account-link"
            aria-label="Account availability"
            title="Accounts are not yet available"
          >
            <UserRound size={19} strokeWidth={1.5} />
          </Link>
          <Link
            href="/bag"
            className="icon-button"
            aria-label="Shopping bag availability"
            title="Purchasing is not yet available"
          >
            <ShoppingBag size={19} strokeWidth={1.5} />
          </Link>
          <button
            ref={menuButton}
            className="icon-button mobile-menu-button"
            aria-label={open ? "Close navigation" : "Open navigation"}
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
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
              <ArrowUpRight size={18} />
            </Link>
          ))}
          <div className="mobile-range-links">
            {ranges.map((range) => (
              <Link
                key={range.id}
                href={`/ranges/${range.id}`}
                onClick={() => setOpen(false)}
              >
                {range.name}
                {range.later ? " · Later" : ""}
              </Link>
            ))}
          </div>
          <Link href="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
