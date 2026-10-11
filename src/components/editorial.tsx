import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ranges, statusLabel, type Product } from "@/lib/catalogue";
import { Media } from "./media";
import { languagePath, translate, type Locale } from "@/lib/languages";
import { tastesFrench } from "@/lib/french";

export function TextLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link href={href} className={`text-link ${light ? "light" : ""}`}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}

export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="page-intro wrap">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <div className="intro-copy">{children}</div>
    </section>
  );
}

export function ProductCard({
  product,
  locale = "en",
}: {
  product: Product;
  locale?: Locale;
}) {
  const range = ranges.find((item) => item.id === product.range)!;
  const path = languagePath(`/products/${product.slug}`, locale);
  return (
    <article className="product-card">
      <Link
        href={path}
        className="product-image-link"
        aria-label={`${locale === "fr" ? "Découvrir" : "Explore"} ${product.name}`}
      >
        <Media
          name={product.image}
          locale={locale}
          caption={false}
          sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 30vw"
        />
        <span className="product-arrow">
          <ArrowUpRight size={19} />
        </span>
      </Link>
      <div className="product-card-meta">
        <span>{range.name}</span>
        <span>{translate(statusLabel(product.status), locale)}</span>
      </div>
      <h3>
        <Link href={path}>{product.name}</Link>
      </h3>
      <p>
        {product.tastes
          .map((taste) => (locale === "fr" ? tastesFrench[taste] : taste))
          .join(" · ")}{" "}
        <span className="concept-taste">
          {locale === "fr" ? "/ orientation envisagée" : "/ intended direction"}
        </span>
      </p>
      <span className="small-note">
        {translate("Price and final format to be confirmed", locale)}
      </span>
    </article>
  );
}

export function RangeIndex() {
  return (
    <div className="range-index">
      {ranges.map((range, index) => (
        <Link href={`/ranges/${range.id}`} key={range.id} className="range-row">
          <span className="range-number">0{index + 1}</span>
          <span className="range-name">{range.name}</span>
          <span className="range-description">{range.description}</span>
          <span className="range-row-status">
            {range.later ? "Coming later" : "In development"}
          </span>
          <ArrowRight size={21} strokeWidth={1.3} />
        </Link>
      ))}
    </div>
  );
}

export function DevelopmentNote({
  children,
  locale = "en",
}: {
  children?: React.ReactNode;
  locale?: Locale;
}) {
  return (
    <aside className="development-note">
      <span className="status-dot" />
      <div>
        <strong>
          {translate("A work in progress, shared honestly.", locale)}
        </strong>
        <p>
          {children ??
            translate(
              "These are development previews. Final products, ingredients, quantities, prices and availability require business approval. Nothing is available to purchase yet.",
              locale,
            )}
        </p>
      </div>
    </aside>
  );
}
