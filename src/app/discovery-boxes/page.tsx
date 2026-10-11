import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro, DevelopmentNote, TextLink } from "@/components/editorial";
import { Media } from "@/components/media";
import { boxes, rangeById } from "@/lib/catalogue";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Discovery boxes",
  "Explore proposed JULA discovery assortments. Final contents, quantities, prices and availability are not confirmed.",
  "/discovery-boxes",
);
export default function DiscoveryBoxes() {
  return (
    <>
      <PageIntro
        eyebrow="Discover, then return"
        title="A few cups. A new favourite."
      >
        <p>
          Try different characters before choosing the one you would like to
          drink again. JULA’s discovery boxes are being developed with that
          simple idea in mind.
        </p>
      </PageIntro>
      <section className="wrap content-section">
        <DevelopmentNote>
          These are proposed assortments, not confirmed offers. Quantities shown
          are planning proposals, not approved commercial net quantities or
          serving claims.
        </DevelopmentNote>
        <div className="box-list">
          {boxes.map((box, index) => (
            <article key={box.slug} className="box-row">
              <Media name={box.image} />
              <div>
                <span className="eyebrow">
                  0{index + 1} · {rangeById(box.range)?.name}
                </span>
                <h2>{box.name}</h2>
                <p>{box.description}</p>
                <p className="small-note">{box.proposedFormat}</p>
                <TextLink href={`/discovery-boxes/${box.slug}`}>
                  Explore this box concept
                </TextLink>
              </div>
            </article>
          ))}
        </div>
        <div className="editorial-callout">
          <h2>A gift with room for discovery.</h2>
          <p>
            Corporate and hospitality gifts are a possible professional
            direction. Personalised sleeves or packaging depend on technical
            feasibility, quantities and confirmation.
          </p>
          <Link href="/professionals" className="button button-outline">
            Professional enquiries
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
