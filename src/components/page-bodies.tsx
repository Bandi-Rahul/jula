import Link from "next/link";
import {
  ArrowUpRight,
  LockKeyhole,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { Media } from "./media";
import { DevelopmentNote, TextLink } from "./editorial";
import { InquiryForm } from "./inquiry-form";
import { FAQ } from "./faq";
import { PreparationGuide } from "./preparation-guide";
import { CookiePreferences } from "./cookie-preferences";
import { PassportPreview } from "./passport-preview";
import { principles, legalPages } from "@/lib/content";
import { publicProducts } from "@/lib/catalogue";
import type { PageId } from "@/lib/pages";

function Story() {
  return (
    <>
      <section className="story-opening wrap">
        <Media name="oriental" priority />
        <div>
          <span className="eyebrow">A taste for what is different</span>
          <h2>
            Not one idea of Asia.
            <br />
            Many distinct traditions.
          </h2>
          <p>
            Somewhere between Asia and Belgium, JULA is being shaped around a
            simple conviction: a beautiful story will never replace the pleasure
            of drinking.
          </p>
          <p>
            Tea, coffee, cocoa, a flower or a roasted grain can each begin a
            different conversation. We want to understand the ingredient before
            giving it a new recipe, and its tradition before telling its story.
          </p>
        </div>
      </section>
      <section className="story-statement">
        <div className="wrap">
          <span className="eyebrow">The beginning</span>
          <blockquote>
            Whatever ends up in the cup
            <br />
            must make you want another.
          </blockquote>
          <p>
            An editorial interpretation of JULA's taste-first development
            principle.
          </p>
        </div>
      </section>
      <section className="story-chapters wrap">
        <div>
          <span className="eyebrow">01 · A house, not a single drink</span>
          <h2>A family of possibilities.</h2>
          <p>
            The project brings together origin-led beverages and original
            recipes. The families help organise them without asking each
            ingredient to fit the same story.
          </p>
          <TextLink href="/shop">Explore the collection</TextLink>
        </div>
        <div>
          <span className="eyebrow">02 · Based in Liège</span>
          <h2>A Belgian starting point.</h2>
          <p>
            JULA is centred in Liège, with Belgium as its initial intended
            market. The company project is independent; no ownership of farms,
            estates or factories is claimed.
          </p>
          <TextLink href="/origins">How we approach sourcing</TextLink>
        </div>
        <div>
          <span className="eyebrow">03 · Still in the making</span>
          <h2>Open about the unfinished.</h2>
          <p>
            Recipes, sourcing, packaging and commercial arrangements are still
            being developed. This website shares selected directions without
            pretending that development is finished.
          </p>
          <TextLink href="/commitments">Our intended commitments</TextLink>
        </div>
      </section>
    </>
  );
}

function Origins() {
  const origins = [
    {
      name: "Japan",
      text: "Sencha and matcha directions, with attention to the actual producer, harvest and processing. No specific grower or partnership is yet published.",
      family: "tea",
    },
    {
      name: "Taiwan",
      text: "An Oriental Beauty oolong direction. Selection of an actual batch and supporting origin records must precede a final product story.",
      family: "tea",
    },
    {
      name: "India",
      text: "Darjeeling tea, Indian coffee and cocoa are proposed directions. Estates, batches and manufacturing partners remain to be confirmed for public publication.",
      family: "coffee",
    },
    {
      name: "China",
      text: "Jasmine-scented tea and supplier-created blooming teas are being explored. Producer details and botanical composition need their own review.",
      family: "flower",
    },
  ];
  return (
    <>
      <section className="origin-opening wrap">
        <p className="large-copy">
          A place name is a starting point.
          <br />
          <em>Not a substitute for traceability.</em>
        </p>
        <p>
          Proposed origin directions describe the development programme. They
          are not verified origins of commercial JULA products and do not imply
          confirmed supplier relationships.
        </p>
      </section>
      <section className="origin-list wrap">
        {origins.map((origin, index) => (
          <article key={origin.name}>
            <span className="range-number">0{index + 1}</span>
            <h2>{origin.name}</h2>
            <p>{origin.text}</p>
            <TextLink href={`/ranges/${origin.family}`}>
              Explore the direction
            </TextLink>
          </article>
        ))}
      </section>
      <section className="quality-section">
        <div className="wrap">
          <div>
            <span className="eyebrow">The intended process</span>
            <h2>
              First the records.
              <br />
              Then the story.
            </h2>
            <p>
              Intended process steps, not completed certifications or audits.
            </p>
          </div>
          <ol>
            <li>
              <strong>Qualify the supplier</strong>
              <p>
                Identity, food-safety information, specifications and capacity
                appropriate to the product.
              </p>
            </li>
            <li>
              <strong>Select the actual batch</strong>
              <p>
                Comparable samples, sensory work and records supporting origin
                and composition.
              </p>
            </li>
            <li>
              <strong>Review the finished product</strong>
              <p>
                Ingredients, allergens, format, preparation, quality and legal
                labelling.
              </p>
            </li>
            <li>
              <strong>Publish supported information</strong>
              <p>
                Verified facts, documented claims and producer stories with
                permission.
              </p>
            </li>
          </ol>
        </div>
      </section>
      <section className="editorial-callout wrap">
        <h2>Meet the makers, when the facts are ready.</h2>
        <p>
          No named producer profile is published yet. Images are contextual
          photography or supplied development illustrations, not evidence of a
          JULA supplier, farm or manufacturing site.
        </p>
        <TextLink href="/passport">The Passport transparency concept</TextLink>
      </section>
    </>
  );
}

function Commitments() {
  return (
    <>
      <section className="commitment-intro wrap">
        <p className="large-copy">
          A principle is useful
          <br />
          <em>only when it guides the work.</em>
        </p>
        <p>
          These are intended standards for JULA's development. No organic,
          Fairtrade, sustainability, audit or certification status is claimed
          without product-specific evidence.
        </p>
      </section>
      <section className="principle-list wrap">
        {principles.map((principle, index) => (
          <article key={principle.title}>
            <span>0{index + 1}</span>
            <h2>{principle.title}</h2>
            <p>{principle.text}</p>
          </article>
        ))}
      </section>
      <section className="editorial-callout wrap page-rule">
        <h2>What we will not substitute.</h2>
        <p>
          A landscape illustration for origin evidence. A prototype for an
          approved recipe. A certification logo for a verified certification. A
          good intention for a measured result.
        </p>
        <TextLink href="/origins">Origins, with context</TextLink>
      </section>
    </>
  );
}

function Professionals() {
  const enabled =
    process.env.FORM_PROCESSING_APPROVED === "true" &&
    Boolean(process.env.ENQUIRY_WEBHOOK_URL);
  return (
    <>
      <section className="professional-intro wrap">
        <Media name="coffee" priority />
        <div>
          <span className="eyebrow">A considered professional offer</span>
          <h2>
            Different places.
            <br />
            Different requirements.
          </h2>
          <p>
            A retail shelf needs clear information. A café needs a reliable
            preparation. A company gift needs thoughtful presentation. Those are
            different conversations, and we would like to understand yours.
          </p>
          <TextLink href="#professional-enquiry">Prepare an enquiry</TextLink>
        </div>
      </section>
      <section className="professional-directions wrap">
        {[
          [
            "Retail & specialist shops",
            "A curated range and discovery formats are proposed. Selling formats, pricing, commercial terms and replenishment are not confirmed.",
          ],
          [
            "Hotels, cafés & restaurants",
            "Beverage selections and preparation support are possible directions, subject to product readiness and the needs of your service.",
          ],
          [
            "Companies & gifting",
            "Discovery gifts for teams or clients are under consideration. No fixed quantities, lead times or volume discounts are offered.",
          ],
          [
            "Personalised packaging",
            "Sleeves and packaging personalisation may be possible. Technical constraints, print requirements and feasibility must be assessed for each request.",
          ],
        ].map(([title, text], index) => (
          <article key={title}>
            <span className="eyebrow">0{index + 1}</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <section className="enquiry-section wrap" id="professional-enquiry">
        <div>
          <span className="eyebrow">Let's understand your project</span>
          <h2>Start with your setting.</h2>
          <p>
            Tell us where the drinks would be served or sold, your intended use
            and any timing or quantity you already have in mind.
          </p>
          <DevelopmentNote>
            Enquiries do not establish a quote, supply agreement or launch date.
            An approved receiving service must be connected before messages can
            be delivered.
          </DevelopmentNote>
        </div>
        <InquiryForm professional enabled={enabled} />
      </section>
    </>
  );
}

function Contact() {
  const enabled =
    process.env.FORM_PROCESSING_APPROVED === "true" &&
    Boolean(process.env.ENQUIRY_WEBHOOK_URL);
  return (
    <section className="enquiry-section wrap contact-section">
      <div>
        <span className="eyebrow">Based in Liège, Belgium</span>
        <h2>Curiosity is welcome.</h2>
        <p>
          A question about a development direction, an editorial request or a
          possible collaboration? Prepare your message here.
        </p>
        <p className="small-note">
          A verified public email address, telephone number, legal business
          address and response-time policy have not yet been supplied. No
          substitute contact details are invented.
        </p>
        <TextLink href="/faq">Questions & answers</TextLink>
        <TextLink href="/professionals">Professional enquiries</TextLink>
      </div>
      <InquiryForm enabled={enabled} />
    </section>
  );
}

function Legal({ id }: { id: keyof typeof legalPages }) {
  const page = legalPages[id];
  return (
    <section className="legal-content wrap">
      <DevelopmentNote>
        This is a working pre-launch draft. Operator details, applicable law and
        service-specific information need business and qualified legal review
        before public commercial launch.
      </DevelopmentNote>
      <p className="legal-intro">{page.intro}</p>
      {page.sections.map((section) => (
        <article key={section.title}>
          <h2>{section.title}</h2>
          <p>{section.text}</p>
        </article>
      ))}
      <TextLink href="/contact">Contact status & enquiries</TextLink>
    </section>
  );
}

export function PageBody({ id }: { id: PageId }) {
  if (id === "our-story") return <Story />;
  if (id === "origins") return <Origins />;
  if (id === "commitments") return <Commitments />;
  if (id === "professionals") return <Professionals />;
  if (id === "contact") return <Contact />;
  if (id === "preparation")
    return (
      <>
        <section className="preparation-opening wrap">
          <Media name="matcha" />
          <div>
            <p>
              The leaf, the grind, the dose and the way a powder meets its
              liquid all affect the finished drink. Preparation is part of
              recipe development, not an afterthought.
            </p>
            <p>
              Product-specific instructions will be published with approved
              products. This guide provides context without inventing exact
              temperatures, ratios or serving instructions.
            </p>
          </div>
        </section>
        <section className="content-section wrap">
          <PreparationGuide />
          <DevelopmentNote>
            Recipes and packaging instructions require validation for each final
            reference. Never use a development preview to decide allergen
            suitability.
          </DevelopmentNote>
        </section>
      </>
    );
  if (id === "faq")
    return (
      <section className="content-section wrap faq-layout">
        <div>
          <h2>Still have a question?</h2>
          <p>
            The site is pre-launch. Clear answers matter more than filling in
            the blanks.
          </p>
          <TextLink href="/contact">Prepare an enquiry</TextLink>
        </div>
        <FAQ />
      </section>
    );
  if (id === "passport")
    return (
      <section className="content-section wrap">
        <DevelopmentNote>
          Passport is a future concept, not a live traceability service, batch
          verification tool or authenticity certificate.
        </DevelopmentNote>
        <PassportPreview products={publicProducts()} />
        <div className="editorial-callout">
          <h2>Useful information, not invented provenance.</h2>
          <p>
            A future Passport could connect a selected product to approved
            preparation, ingredient declarations and supported origin records.
            It requires real batch data, integrations and a clear publication
            process.
          </p>
          <TextLink href="/origins">Our sourcing approach</TextLink>
        </div>
      </section>
    );
  if (id === "cookies")
    return (
      <section className="content-section wrap">
        <CookiePreferences />
        <p className="small-note">
          No non-essential consent banner is shown because analytics and
          advertising services are not installed. Local storage is used only
          when you explicitly save these preferences.{" "}
          <Link href="/privacy">Privacy notice</Link>.
        </p>
      </section>
    );
  if (id === "account" || id === "bag")
    return (
      <section className="unavailable-service wrap">
        <div>
          {id === "account" ? (
            <UserRound size={35} strokeWidth={1} />
          ) : (
            <ShoppingBag size={35} strokeWidth={1} />
          )}
          <h2>
            {id === "account"
              ? "Accounts are not active."
              : "Purchasing is not active."}
          </h2>
          <p>
            {id === "account"
              ? "No sign-in, registration, password storage or order history is available. Account services require a secure provider and approved privacy processes before activation."
              : "These development previews have no approved prices, selling formats or stock. No products are added to a cart, and no payment or reservation is taken."}
          </p>
          <Link href="/shop" className="button button-outline">
            Explore the collection
            <ArrowUpRight size={17} />
          </Link>
          <span className="small-note">
            <LockKeyhole size={13} /> No transactions or account data are
            processed.
          </span>
        </div>
      </section>
    );
  if (id === "nl")
    return (
      <section className="unavailable-service wrap">
        <div>
          <h2>English is the current edition.</h2>
          <p>
            Nederlands content needs a complete reviewed translation before
            activation. This page does not claim to be a translated edition.
          </p>
          <Link href="/" className="button button-outline">
            Explore in English
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    );
  if (id in legalPages) return <Legal id={id as keyof typeof legalPages} />;
  return null;
}
