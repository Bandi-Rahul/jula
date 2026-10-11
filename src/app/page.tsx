import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Media } from "@/components/media";
import { RangeIndex, TextLink } from "@/components/editorial";
import { Newsletter } from "@/components/newsletter";
import { assetPath } from "@/lib/hosting";

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <Image
          src={assetPath("/images/tea-ritual.webp")}
          alt="Tea in a glass cup in contextual beverage photography"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-scrim" />
        <div className="hero-content wrap">
          <span className="eyebrow">
            Liège, Belgium · A house in the making
          </span>
          <h1 id="hero-title">
            JULA
            <span>
              A little curiosity.
              <br />A cup worth returning to.
            </span>
          </h1>
          <p>
            Teas, infusions and distinctive drinks.
            <br />
            Asian inspirations, each with their own story.
          </p>
          <Link href="/shop" className="button button-cream">
            Explore JULA <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="hero-bottom wrap">
          <span>Pre-launch collection · Not yet available to purchase</span>
          <span>Contextual photography · Not a JULA product</span>
        </div>
      </section>
      <section className="home-introduction wrap">
        <span className="eyebrow">A taste for discovery</span>
        <h2>
          Different traditions.
          <br />
          <em>The same pleasure of a good cup.</em>
        </h2>
        <div>
          <p>
            A Japanese green tea is not a Taiwanese oolong. An Indian coffee is
            not a spiced infusion. JULA makes room for those differences.
          </p>
          <p>
            We are developing a beverage house around real ingredients,
            considered combinations and the simple wish to have another cup.
          </p>
          <TextLink href="/our-story">Meet JULA</TextLink>
        </div>
      </section>
      <section className="collection-section wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">The JULA families</span>
            <h2>Find your kind of cup.</h2>
          </div>
          <p>
            Six families in development.
            <br />
            One more for a later chapter.
          </p>
        </div>
        <div className="collection-editorial">
          <Media name="oriental" className="collection-feature" />
          <div className="collection-feature-copy">
            <span className="eyebrow">A closer look · GO TEA</span>
            <h3>
              Each leaf has
              <br />
              its own character.
            </h3>
            <p>
              Origin-led teas and original blends, explored through actual
              batches and comparative tasting.
            </p>
            <TextLink href="/ranges/tea">Discover GO TEA</TextLink>
          </div>
        </div>
        <RangeIndex />
      </section>
      <section className="discovery-band">
        <div className="wrap discovery-layout">
          <div>
            <span className="eyebrow">Discovery, before favourites</span>
            <h2>
              Start with a few.
              <br />
              <em>Come back to your own.</em>
            </h2>
            <p>
              A discovery box is a way to try different drinks, find what
              appeals to you and return to a favourite when individual formats
              become available.
            </p>
            <TextLink href="/discovery-boxes">
              Explore the box concepts
            </TextLink>
            <span className="small-note">
              Proposed assortments. Contents and formats await approval.
            </span>
          </div>
          <div className="discovery-art">
            <Media name="botanical" />
            <span className="discovery-caption">
              A cup is a starting point, not a destination.
            </span>
          </div>
        </div>
      </section>
      <section className="taste-section wrap">
        <div className="taste-heading">
          <span className="eyebrow">The first principle</span>
          <h2>
            Taste comes first.
            <br />
            And then the tenth sip.
          </h2>
          <p>
            An attractive idea is not enough. We compare balance, texture,
            finish and the desire for a second cup. Recipes and preparation
            belong in the same conversation.
          </p>
          <TextLink href="/preparation">A considered preparation</TextLink>
        </div>
        <Media name="matcha" className="taste-media" />
      </section>
      <section className="origins-strip wrap">
        <span className="eyebrow">Ingredients, not shortcuts</span>
        <h2>
          The story should
          <br />
          be as honest as the cup.
        </h2>
        <div>
          <p>
            Origin and producer information should come from verified records.
            JULA is building its sourcing and quality process; confirmed partner
            stories will follow only when the evidence and permissions are in
            place.
          </p>
          <TextLink href="/origins">Our approach to origins</TextLink>
        </div>
      </section>
      <section className="professional-band">
        <div className="wrap">
          <span className="eyebrow">For shops, hospitality & companies</span>
          <h2>
            A place for JULA
            <br />
            in your business.
          </h2>
          <div>
            <p>
              Retail shelves, hotel breakfasts, café menus or a considered gift.
              Tell us about your setting and what you have in mind.
            </p>
            <TextLink href="/professionals" light>
              Let’s talk professionally
            </TextLink>
            <span className="small-note">
              Supply and personalisation are subject to feasibility and
              confirmation.
            </span>
          </div>
        </div>
      </section>
      <section className="commitment-home wrap">
        <span className="eyebrow">Commitments, with context</span>
        <h2>
          Good intentions need
          <br />
          more than good words.
        </h2>
        <p>
          Ingredient identity, supplier qualification and traceability are
          standards we intend to build into the work. They are not claims of
          completed audits or certification.
        </p>
        <Link
          href="/commitments"
          className="round-link"
          aria-label="Read our commitments"
        >
          <ArrowRight size={25} />
        </Link>
      </section>
      <Newsletter />
    </>
  );
}
