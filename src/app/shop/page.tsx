import { Catalog } from "@/components/catalog";
import { DevelopmentNote, PageIntro } from "@/components/editorial";
import { publicProducts } from "@/lib/catalogue";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Explore the collection",
  "Explore JULA's public development previews by family, ingredient and intended taste direction. Purchasing is not yet available.",
  "/shop",
);

export default function Shop() {
  return (
    <>
      <PageIntro
        eyebrow="The collection · Pre-launch"
        title="Find your kind of cup."
      >
        <p>
          A leaf, a flower, a roasted bean. Explore the drink directions
          currently in development at JULA.
        </p>
      </PageIntro>
      <section className="content-section wrap">
        <DevelopmentNote />
        <Catalog items={publicProducts()} />
      </section>
    </>
  );
}
