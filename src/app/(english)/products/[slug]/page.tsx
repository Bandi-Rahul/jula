import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
import { Gallery } from "@/components/gallery";
import { DevelopmentNote, ProductCard, TextLink } from "@/components/editorial";
import {
  productBySlug,
  publicProducts,
  rangeById,
  statusLabel,
} from "@/lib/catalogue";
import { media } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return publicProducts().map((product) => ({ slug: product.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const product = productBySlug((await params).slug);
  if (!product) return {};
  return pageMetadata(
    product.name,
    product.description,
    `/products/${product.slug}`,
    media[product.image].src,
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const product = productBySlug((await params).slug);
  if (!product) notFound();
  const range = rangeById(product.range)!;
  const related = publicProducts()
    .filter((item) => item.range === product.range && item.id !== product.id)
    .slice(0, 3);
  return (
    <>
      <section className="product-detail wrap">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/shop">Collection</Link>
          <span>/</span>
          <Link href={`/ranges/${range.id}`}>{range.name}</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>
        <div className="product-detail-grid">
          <Gallery name={product.image} />
          <div className="product-detail-copy">
            <span className="eyebrow">
              {range.name} · {statusLabel(product.status)}
            </span>
            <h1>{product.name}</h1>
            <p className="product-description">{product.description}</p>
            <div className="taste-labels">
              <span>Intended direction</span>
              <p>{product.tastes.join(" · ")}</p>
            </div>
            <dl className="product-facts">
              <div>
                <dt>Origin</dt>
                <dd>
                  {product.proposedOrigin
                    ? `${product.proposedOrigin} · proposed, not batch-verified`
                    : "To be confirmed"}
                </dd>
              </div>
              <div>
                <dt>Format & quantity</dt>
                <dd>
                  {product.packaging ?? "Final format and net quantity pending"}
                </dd>
              </div>
              <div>
                <dt>Price</dt>
                <dd>
                  {product.price === null
                    ? "To be confirmed"
                    : new Intl.NumberFormat("en-BE", {
                        style: "currency",
                        currency: product.currency,
                      }).format(product.price)}
                </dd>
              </div>
            </dl>
            <button className="button unavailable-button" disabled>
              <LockKeyhole size={16} />
              Not yet available to purchase
            </button>
            <p className="small-note">
              There is no checkout, stock reservation or payment service on this
              pre-launch website.
            </p>
            <Link href="/contact" className="text-link">
              Ask about this direction
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <section className="product-information wrap">
        <DevelopmentNote />
        <div className="product-information-layout">
          <div>
            <span className="eyebrow">Know what is in the cup</span>
            <h2>
              Clear details.
              <br />
              No assumptions.
            </h2>
            <p>
              Approved information will be published before commercial
              availability. Until then, the missing details remain visible.
            </p>
          </div>
          <div className="accordion-list">
            <details open>
              <summary>Ingredients & allergens</summary>
              <div>
                <h3>Ingredients</h3>
                <p>
                  {product.ingredients?.join(", ") ??
                    "The full ingredient declaration has not been approved."}
                </p>
                <h3>Allergen review</h3>
                <p>{product.allergenReview}</p>
                <p className="allergen-warning">
                  Do not rely on this preview to make an allergy or
                  dietary-suitability decision.
                </p>
              </div>
            </details>
            <details>
              <summary>Preparation & serving</summary>
              <div>
                {product.preparation ? (
                  <ol>
                    {product.preparation.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                ) : (
                  <p>
                    Product-specific dose, liquid, temperature and timing are
                    not yet confirmed. Prototype parameters are not published as
                    final instructions.
                  </p>
                )}
                <TextLink href="/preparation">
                  Our preparation approach
                </TextLink>
              </div>
            </details>
            <details>
              <summary>Origin & sourcing</summary>
              <div>
                <p>
                  {product.proposedOrigin
                    ? `${product.proposedOrigin} is the proposed origin direction. A selected producer, batch, harvest and supporting provenance records are not yet published.`
                    : "Ingredient origins and supplier records will be confirmed with the approved composition and selected batches."}
                </p>
                <TextLink href="/origins">Origins & producers</TextLink>
              </div>
            </details>
            <details>
              <summary>Packaging & storage</summary>
              <div>
                <p>
                  {product.storage ??
                    "Final packaging, storage conditions, shelf life and best-before information require validation. Illustrated packaging should not be treated as final."}
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="related-products wrap">
          <div className="section-heading">
            <h2>More from {range.name}.</h2>
            <TextLink href={`/ranges/${range.id}`}>See the family</TextLink>
          </div>
          <div className="product-grid">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
