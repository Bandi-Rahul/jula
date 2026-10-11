import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Media } from "@/components/media";
import { DevelopmentNote, ProductCard, TextLink } from "@/components/editorial";
import { publicProducts, rangeById, ranges, boxes } from "@/lib/catalogue";
import { media } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return ranges.map((range) => ({ id: range.id }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const range = rangeById((await params).id);
  if (!range) return {};
  return pageMetadata(
    range.name,
    range.description,
    `/ranges/${range.id}`,
    media[range.image].src,
  );
}

export default async function RangePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const range = rangeById((await params).id);
  if (!range) notFound();
  const items = publicProducts().filter(
    (product) => product.range === range.id,
  );
  const discovery = boxes.find((box) => box.range === range.id);
  return (
    <>
      <section className="range-hero wrap">
        <div>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/shop">Collection</Link>
            <span>/</span>
            <span>{range.name}</span>
          </nav>
          <span className="eyebrow">
            {range.later ? "A later chapter" : "A family in development"}
          </span>
          <h1>{range.name}</h1>
          <h2>{range.title}</h2>
          <p>{range.longDescription}</p>
          <span className="range-accent" style={{ background: range.accent }} />
        </div>
        <Media name={range.image} priority />
      </section>
      <section className="wrap range-context">
        <span className="eyebrow">Context matters</span>
        <p>{range.context}</p>
        <TextLink href="/origins">Our approach to origins</TextLink>
      </section>
      <section className="content-section wrap">
        <DevelopmentNote>
          {range.later
            ? "This family is planned for later development. There are no confirmed products, formats, prices or launch dates."
            : "These previews describe intended directions. Final recipes, batches, formats and preparation methods must be approved before sale."}
        </DevelopmentNote>
        {items.length > 0 ? (
          <>
            <div className="section-heading range-products-heading">
              <h2>Explore the directions.</h2>
              <span className="small-note">{items.length} public previews</span>
            </div>
            <div className="product-grid">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <h2>Something for a later cup.</h2>
            <p>
              GO ROASTED remains outside the immediate launch collection. We
              will share more when there is a confirmed selection.
            </p>
            <TextLink href="/shop">Explore the current previews</TextLink>
          </div>
        )}
        {discovery && (
          <div className="range-discovery">
            <div>
              <span className="eyebrow">A proposed discovery box</span>
              <h2>{discovery.name}</h2>
              <p>{discovery.description}</p>
            </div>
            <Link
              href={`/discovery-boxes/${discovery.slug}`}
              className="button button-outline"
            >
              See the concept <ArrowUpRight size={17} />
            </Link>
          </div>
        )}
        <p className="catalog-image-note">
          Images are contextual photographs or development illustrations, not
          final JULA products or selected producers.
        </p>
      </section>
    </>
  );
}
