import Link from "next/link";
import { notFound } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { DevelopmentNote, TextLink } from "@/components/editorial";
import { Media } from "@/components/media";
import { boxes, rangeById } from "@/lib/catalogue";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return boxes.map((box) => ({ slug: box.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const box = boxes.find((item) => item.slug === slug);
  return box
    ? pageMetadata(box.name, box.description, `/discovery-boxes/${box.slug}`)
    : {};
}
export default async function BoxPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const box = boxes.find((item) => item.slug === slug);
  if (!box) notFound();
  const range = rangeById(box.range)!;
  return (
    <>
      <section className="range-hero wrap">
        <div>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/discovery-boxes">Discovery boxes</Link>
            <span>/</span>
            <span>{box.name}</span>
          </nav>
          <span className="eyebrow">{range.name} · Box concept</span>
          <h1>{box.name}</h1>
          <p>{box.description}</p>
          <p className="box-proposal">{box.proposedFormat}</p>
          <button disabled className="button unavailable-button">
            <LockKeyhole size={16} />
            Not yet available
          </button>
          <p className="small-note">
            Price, packaging and final selection are not confirmed.
          </p>
        </div>
        <Media name={box.image} priority />
      </section>
      <section className="content-section wrap">
        <DevelopmentNote>
          Individual flavour previews do not establish the contents of this box.
          Final contents, ingredient and allergen declarations, preparation
          instructions and quantities require separate approval.
        </DevelopmentNote>
        <div className="editorial-callout">
          <h2>Discover the family behind it.</h2>
          <p>
            Explore the drink directions in development, without assuming that
            every preview will be included in a final assortment.
          </p>
          <TextLink href={`/ranges/${range.id}`}>Explore {range.name}</TextLink>
        </div>
      </section>
    </>
  );
}
