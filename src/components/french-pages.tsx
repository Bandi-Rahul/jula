import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, LockKeyhole } from "lucide-react";
import { ranges, boxes, rangeById, statusLabel } from "@/lib/catalogue";
import {
  boxCopyFrench,
  frenchPages,
  frenchProducts,
  frenchRoutePaths,
  rangesFrench,
  tastesFrench,
} from "@/lib/french";
import { assetPath, staticHosting } from "@/lib/hosting";
import { translate } from "@/lib/languages";
import { Media } from "./media";
import { Gallery } from "./gallery";
import { Catalog } from "./catalog";
import { PageIntro, ProductCard, DevelopmentNote, TextLink } from "./editorial";
import { Newsletter } from "./newsletter";
import { InquiryForm } from "./inquiry-form";
import { FAQ } from "./faq";
import { PreparationGuide } from "./preparation-guide";
import { PassportPreview } from "./passport-preview";
import { CookiePreferences } from "./cookie-preferences";

export function frenchPageInfo(
  path: string,
): { title: string; description: string } | undefined {
  if (!frenchRoutePaths.includes(path)) return undefined;
  if (!path)
    return {
      title: "Une maison de boissons en devenir",
      description:
        "JULA, une maison de boissons en développement à Liège. Thés, infusions, lattés, cacao, café et créations florales.",
    };
  if (path === "shop")
    return {
      title: "La collection",
      description:
        "Explorez les aperçus de développement JULA. Aucun produit n'est encore disponible à l'achat.",
    };
  if (path === "discovery-boxes")
    return {
      title: "Coffrets découverte",
      description:
        "Des assortiments envisagés pour découvrir plusieurs boissons. Contenus et formats restent à valider.",
    };
  const [kind, slug] = path.split("/");
  if (kind === "products") {
    const product = frenchProducts().find((item) => item.slug === slug);
    return product
      ? { title: product.name, description: product.description }
      : undefined;
  }
  if (kind === "ranges") {
    const range = rangeById(slug);
    return range
      ? { title: range.name, description: rangesFrench[range.id].description }
      : undefined;
  }
  if (kind === "discovery-boxes") {
    const box = boxCopyFrench[slug];
    return box ? { title: box.name, description: box.description } : undefined;
  }
  return frenchPages[path];
}

function FrenchRangeIndex() {
  return (
    <div className="range-index">
      {ranges.map((range, index) => (
        <Link
          href={`/fr/ranges/${range.id}`}
          key={range.id}
          className="range-row"
        >
          <span className="range-number">0{index + 1}</span>
          <span className="range-name">{range.name}</span>
          <span className="range-description">
            {rangesFrench[range.id].description}
          </span>
          <span className="range-row-status">
            {range.later ? "Pour plus tard" : "En développement"}
          </span>
          <ArrowRight size={21} strokeWidth={1.3} />
        </Link>
      ))}
    </div>
  );
}

export function FrenchHome() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <Image
          src={assetPath("/images/tea-ritual.webp")}
          alt="Thé dans une tasse en verre, photographie de contexte"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-scrim" />
        <div className="hero-content wrap">
          <span className="eyebrow">
            Liège, Belgique · Une maison en devenir
          </span>
          <h1 id="hero-title">
            JULA
            <span>
              Un peu de curiosité.
              <br />
              Une tasse à laquelle on revient.
            </span>
          </h1>
          <p>
            Thés, infusions et boissons singulières.
            <br />
            Des inspirations asiatiques, chacune avec son histoire.
          </p>
          <Link href="/fr/shop" className="button button-cream">
            Explorer JULA <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="hero-bottom wrap">
          <span>Collection de pré-lancement · Aucun achat possible</span>
          <span>Photographie de contexte · Pas un produit JULA</span>
        </div>
      </section>
      <section className="home-introduction wrap">
        <span className="eyebrow">Le goût de la découverte</span>
        <h2>
          Des traditions différentes.
          <br />
          <em>Le même plaisir d'une bonne tasse.</em>
        </h2>
        <div>
          <p>
            Un thé vert japonais n'est pas un oolong taïwanais. Un café indien
            n'est pas une infusion épicée. JULA fait une place à ces
            différences.
          </p>
          <p>
            Nous développons une maison de boissons autour d'ingrédients réels,
            d'associations réfléchies et de l'envie simple d'une deuxième tasse.
          </p>
          <TextLink href="/fr/our-story">Rencontrer JULA</TextLink>
        </div>
      </section>
      <section className="collection-section wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Les familles JULA</span>
            <h2>Trouvez votre tasse.</h2>
          </div>
          <p>
            Six familles en développement.
            <br />
            Une autre pour un prochain chapitre.
          </p>
        </div>
        <div className="collection-editorial">
          <Media name="oriental" locale="fr" className="collection-feature" />
          <div className="collection-feature-copy">
            <span className="eyebrow">De plus près · GO TEA</span>
            <h3>
              Chaque feuille
              <br />a son caractère.
            </h3>
            <p>
              Thés d'origine et mélanges originaux, explorés à travers des lots
              réels et des dégustations comparatives.
            </p>
            <TextLink href="/fr/ranges/tea">Découvrir GO TEA</TextLink>
          </div>
        </div>
        <FrenchRangeIndex />
      </section>
      <section className="discovery-band">
        <div className="wrap discovery-layout">
          <div>
            <span className="eyebrow">Découvrir avant de choisir</span>
            <h2>
              Commencez par quelques tasses.
              <br />
              <em>Revenez à la vôtre.</em>
            </h2>
            <p>
              Un coffret permettrait d'explorer plusieurs boissons et de
              retrouver votre préférée lorsque les formats individuels seront
              disponibles.
            </p>
            <TextLink href="/fr/discovery-boxes">
              Explorer les coffrets
            </TextLink>
            <span className="small-note">
              Assortiments proposés. Contenus et formats à valider.
            </span>
          </div>
          <div className="discovery-art">
            <Media name="botanical" locale="fr" />
            <span className="discovery-caption">
              Une tasse est un point de départ.
            </span>
          </div>
        </div>
      </section>
      <section className="taste-section wrap">
        <div className="taste-heading">
          <span className="eyebrow">Le premier principe</span>
          <h2>
            Le goût d'abord.
            <br />
            Puis la dixième gorgée.
          </h2>
          <p>
            Une idée séduisante ne suffit pas. Équilibre, texture, finale et
            envie d'une deuxième tasse sont comparés. Recette et préparation
            vont ensemble.
          </p>
          <TextLink href="/fr/preparation">Une préparation réfléchie</TextLink>
        </div>
        <Media name="matcha" locale="fr" className="taste-media" />
      </section>
      <section className="origins-strip wrap">
        <span className="eyebrow">Des ingrédients, pas des raccourcis</span>
        <h2>
          Un récit aussi honnête
          <br />
          que la tasse.
        </h2>
        <div>
          <p>
            Origines et producteurs doivent être documentés. Les partenariats
            seront présentés lorsque les preuves et autorisations seront
            réunies.
          </p>
          <TextLink href="/fr/origins">Notre approche des origines</TextLink>
        </div>
      </section>
      <section className="professional-band">
        <div className="wrap">
          <span className="eyebrow">Commerces, hôtellerie et entreprises</span>
          <h2>
            Une place pour JULA
            <br />
            dans votre activité.
          </h2>
          <div>
            <p>
              Rayon de boutique, petit-déjeuner d'hôtel, carte de café ou cadeau
              choisi : parlez-nous de votre projet.
            </p>
            <TextLink href="/fr/professionals" light>
              Parlons professionnellement
            </TextLink>
            <span className="small-note">
              Fourniture et personnalisation soumises à faisabilité et
              confirmation.
            </span>
          </div>
        </div>
      </section>
      <section className="commitment-home wrap">
        <span className="eyebrow">Des engagements avec du contexte</span>
        <h2>
          Les bonnes intentions
          <br />
          ont besoin de plus que des mots.
        </h2>
        <p>
          Identité des ingrédients, qualification des fournisseurs et
          traçabilité sont des standards envisagés, pas des audits ou
          certifications déjà réalisés.
        </p>
        <Link
          href="/fr/commitments"
          className="round-link"
          aria-label="Lire nos engagements"
        >
          <ArrowRight size={25} />
        </Link>
      </section>
      <Newsletter locale="fr" />
    </>
  );
}

function FrenchProduct({ slug }: { slug: string }) {
  const items = frenchProducts();
  const product = items.find((item) => item.slug === slug);
  if (!product) notFound();
  const range = rangeById(product.range)!;
  const related = items
    .filter((item) => item.range === product.range && item.id !== product.id)
    .slice(0, 3);
  return (
    <>
      <section className="product-detail wrap">
        <nav className="breadcrumb" aria-label="Fil d'Ariane">
          <Link href="/fr/shop">Collection</Link>
          <span>/</span>
          <Link href={`/fr/ranges/${range.id}`}>{range.name}</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>
        <div className="product-detail-grid">
          <Gallery name={product.image} locale="fr" />
          <div className="product-detail-copy">
            <span className="eyebrow">
              {range.name} · {translate(statusLabel(product.status), "fr")}
            </span>
            <h1>{product.name}</h1>
            <p className="product-description">{product.description}</p>
            <div className="taste-labels">
              <span>Orientation envisagée</span>
              <p>
                {product.tastes.map((taste) => tastesFrench[taste]).join(" · ")}
              </p>
            </div>
            <dl className="product-facts">
              <div>
                <dt>Origine</dt>
                <dd>
                  {product.proposedOrigin
                    ? `${product.proposedOrigin} · envisagée, non vérifiée pour un lot`
                    : "À confirmer"}
                </dd>
              </div>
              <div>
                <dt>Format et quantité</dt>
                <dd>Format final et quantité nette à valider</dd>
              </div>
              <div>
                <dt>Prix</dt>
                <dd>À confirmer</dd>
              </div>
            </dl>
            <button className="button unavailable-button" disabled>
              <LockKeyhole size={16} />
              Pas encore disponible à l'achat
            </button>
            <p className="small-note">
              Aucun paiement, commande ou réservation de stock sur ce site de
              pré-lancement.
            </p>
            <TextLink href="/fr/contact">
              Poser une question sur cette piste
            </TextLink>
          </div>
        </div>
      </section>
      <section className="product-information wrap">
        <DevelopmentNote locale="fr" />
        <div className="product-information-layout">
          <div>
            <span className="eyebrow">Savoir ce qu'il y a dans la tasse</span>
            <h2>
              Des détails clairs.
              <br />
              Pas de suppositions.
            </h2>
            <p>
              Les informations approuvées seront publiées avant la
              commercialisation. Les détails manquants restent visibles.
            </p>
          </div>
          <div className="accordion-list">
            <details open>
              <summary>Ingrédients et allergènes</summary>
              <div>
                <h3>Ingrédients</h3>
                <p>
                  La déclaration complète des ingrédients n'a pas été validée.
                </p>
                <h3>Vérification des allergènes</h3>
                <p>{product.allergenReview}</p>
                <p className="allergen-warning">
                  Ne vous fiez pas à cet aperçu pour décider de la compatibilité
                  avec une allergie ou un régime alimentaire.
                </p>
              </div>
            </details>
            <details>
              <summary>Préparation et portions</summary>
              <div>
                <p>
                  Dose, liquide, température et durée ne sont pas encore
                  confirmés. Les paramètres de prototype ne sont pas des
                  instructions finales.
                </p>
                <TextLink href="/fr/preparation">
                  Notre approche de la préparation
                </TextLink>
              </div>
            </details>
            <details>
              <summary>Origine et approvisionnement</summary>
              <div>
                <p>
                  Producteur sélectionné, lot, récolte et documents de
                  provenance ne sont pas encore publiés. Les origines envisagées
                  ne sont pas des origines vérifiées.
                </p>
                <TextLink href="/fr/origins">Origines et producteurs</TextLink>
              </div>
            </details>
            <details>
              <summary>Emballage et conservation</summary>
              <div>
                <p>
                  Emballage final, conservation, durée de vie et date de
                  durabilité nécessitent une validation. Les illustrations ne
                  représentent pas l'emballage final.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="related-products wrap">
          <div className="section-heading">
            <h2>Dans la famille {range.name}.</h2>
            <TextLink href={`/fr/ranges/${range.id}`}>Voir la famille</TextLink>
          </div>
          <div className="product-grid">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} locale="fr" />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function FrenchBoxes({ slug }: { slug?: string }) {
  const selection = slug ? boxes.filter((box) => box.slug === slug) : boxes;
  if (!selection.length) notFound();
  const info = slug
    ? boxCopyFrench[slug]
    : {
        name: "Découvrir avant de choisir.",
        description:
          "Des assortiments envisagés pour explorer plusieurs boissons avant de retrouver vos préférées.",
      };
  return (
    <>
      <PageIntro eyebrow="Coffrets découverte · Propositions" title={info.name}>
        <p>{info.description}</p>
      </PageIntro>
      <section className="content-section wrap">
        <DevelopmentNote locale="fr" />
        {selection.map((box) => (
          <div key={box.slug} className="story-opening">
            <Media name={box.image} locale="fr" />
            <div>
              <span className="eyebrow">{rangeById(box.range)?.name}</span>
              <h2>{boxCopyFrench[box.slug].name}</h2>
              <p>{boxCopyFrench[box.slug].description}</p>
              <p>{boxCopyFrench[box.slug].proposedFormat}</p>
              <p className="small-note">
                Sélections, ingrédients, allergènes, emballages et prix restent
                à valider.
              </p>
              {slug ? (
                <>
                  <button className="button" disabled>
                    <LockKeyhole size={16} />
                    Pas encore disponible à l'achat
                  </button>
                  <TextLink href={`/fr/ranges/${box.range}`}>
                    Explorer cette famille
                  </TextLink>
                </>
              ) : (
                <TextLink href={`/fr/discovery-boxes/${box.slug}`}>
                  Découvrir ce coffret
                </TextLink>
              )}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export function FrenchPage({ path }: { path: string }) {
  if (!frenchPageInfo(path)) notFound();
  if (!path) return <FrenchHome />;
  const [kind, slug] = path.split("/");
  if (kind === "products") return <FrenchProduct slug={slug} />;
  if (kind === "discovery-boxes") return <FrenchBoxes slug={slug} />;
  if (kind === "shop")
    return (
      <>
        <PageIntro
          eyebrow="La collection · Pré-lancement"
          title="Trouvez votre tasse."
        >
          <p>
            Explorez les boissons en développement. Recettes, prix et formats
            restent à confirmer.
          </p>
        </PageIntro>
        <section className="content-section wrap">
          <Catalog items={frenchProducts()} locale="fr" />
          <DevelopmentNote locale="fr" />
        </section>
      </>
    );
  if (kind === "ranges") {
    const range = rangeById(slug);
    if (!range) notFound();
    const copy = rangesFrench[range.id];
    return (
      <>
        <PageIntro
          eyebrow={`${range.name} · ${range.later ? "Pour plus tard" : "En développement"}`}
          title={copy.title}
        >
          <p>{copy.description}</p>
        </PageIntro>
        <section className="story-opening wrap">
          <Media name={range.image} locale="fr" priority />
          <div>
            <h2>{range.name}</h2>
            <p>{copy.context}</p>
            <DevelopmentNote locale="fr" />
          </div>
        </section>
        <section className="content-section wrap">
          <Catalog
            items={frenchProducts().filter(
              (product) => product.range === range.id,
            )}
            locale="fr"
          />
          <TextLink href="/fr/shop">Toute la collection</TextLink>
        </section>
      </>
    );
  }
  const copy = frenchPages[path];
  const formEnabled =
    !staticHosting &&
    process.env.FORM_PROCESSING_APPROVED === "true" &&
    Boolean(process.env.ENQUIRY_WEBHOOK_URL);
  return (
    <>
      <PageIntro eyebrow="JULA · Pré-lancement" title={copy.heading}>
        <p>{copy.description}</p>
      </PageIntro>
      {path === "our-story" && (
        <section className="story-opening wrap">
          <Media name="oriental" locale="fr" priority />
          <div>
            <h2>Le goût de la différence.</h2>
            <p>
              Entre l'Asie et la Belgique, une conviction simple : une belle
              histoire ne remplace jamais le plaisir de boire.
            </p>
          </div>
        </section>
      )}
      {path === "professionals" && (
        <section className="professional-intro wrap">
          <Media name="coffee" locale="fr" priority />
          <div>
            <h2>
              Des lieux différents.
              <br />
              Des besoins différents.
            </h2>
            <p>
              Un rayon a besoin d'informations claires. Un café, d'une
              préparation fiable. Un cadeau, d'une présentation réfléchie.
            </p>
            <TextLink href="#professional-enquiry">
              Préparer une demande
            </TextLink>
          </div>
        </section>
      )}
      {copy.sections.length > 0 && (
        <section
          className={`${path === "professionals" ? "professional-directions" : "legal-content"} wrap`}
        >
          {copy.sections.map(([title, text]) => (
            <article key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </section>
      )}
      {["privacy", "terms", "shipping", "returns"].includes(path) && (
        <section className="content-section wrap">
          <DevelopmentNote locale="fr">
            Projet de pré-lancement à faire vérifier par l'entreprise et un
            conseil juridique qualifié avant toute activité commerciale.
          </DevelopmentNote>
          {path === "privacy" && (
            <article>
              <h2>Formulaires</h2>
              <p>
                {staticHosting
                  ? "Sur cette édition GitHub Pages, les champs sont vérifiés uniquement dans votre navigateur. Rien n'est transmis, enregistré par l'application ou utilisé pour créer un abonnement. GitHub Pages peut traiter des journaux ordinaires d'hébergement."
                  : "La vérification envoie les champs au serveur du site. L'application n'enregistre pas le brouillon. Sans service de réception approuvé, les champs ne sont pas transférés et aucun abonnement n'est créé. Un service approuvé, s'il est configuré, reçoit les données soumises. Les journaux d'hébergement peuvent être traités par l'infrastructure."}
              </p>
            </article>
          )}
        </section>
      )}
      {(path === "contact" || path === "professionals") && (
        <section className="enquiry-section wrap" id="professional-enquiry">
          <div>
            <span className="eyebrow">Préparer votre projet</span>
            <h2>La conversation commence ici.</h2>
            <p>
              Décrivez votre demande, votre usage prévu et, si vous les
              connaissez, les quantités ou le calendrier.
            </p>
            <DevelopmentNote locale="fr">
              Une demande ne constitue ni devis, ni accord de fourniture, ni
              date de lancement. Un service de réception approuvé est nécessaire
              pour la transmettre.
            </DevelopmentNote>
            <TextLink href="/fr/faq">Questions et réponses</TextLink>
          </div>
          <InquiryForm
            professional={path === "professionals"}
            enabled={formEnabled}
            locale="fr"
          />
        </section>
      )}
      {path === "faq" && (
        <section className="content-section wrap faq-layout">
          <div>
            <h2>Une autre question ?</h2>
            <p>Des réponses claires, sans inventer ce qui reste à confirmer.</p>
            <TextLink href="/fr/contact">Préparer une demande</TextLink>
          </div>
          <FAQ locale="fr" />
        </section>
      )}
      {path === "preparation" && (
        <>
          <section className="preparation-opening wrap">
            <Media name="matcha" locale="fr" />
            <div>
              <p>
                Feuille, mouture, dose et mélange influencent la boisson. La
                préparation fait partie du développement de la recette.
              </p>
              <p>
                Ce guide donne un contexte général sans inventer de
                températures, ratios ou portions définitifs.
              </p>
            </div>
          </section>
          <section className="content-section wrap">
            <PreparationGuide locale="fr" />
            <DevelopmentNote locale="fr" />
          </section>
        </>
      )}
      {path === "passport" && (
        <section className="content-section wrap">
          <DevelopmentNote locale="fr">
            Passport est un concept futur, pas un service actif de traçabilité,
            d'authentification ou de vérification de lot.
          </DevelopmentNote>
          <PassportPreview products={frenchProducts()} locale="fr" />
        </section>
      )}
      {path === "cookies" && (
        <section className="content-section wrap">
          <CookiePreferences locale="fr" />
          <p className="small-note">
            Aucun service d'analyse ou de publicité n'est installé. Les
            préférences ne sont stockées que lorsque vous les enregistrez
            explicitement.
          </p>
          <TextLink href="/fr/privacy">Notice de confidentialité</TextLink>
        </section>
      )}
      {["account", "bag", "commitments", "origins", "our-story"].includes(
        path,
      ) && (
        <section className="editorial-callout wrap">
          <TextLink href="/fr/shop">Explorer la collection</TextLink>
          <TextLink href="/fr/contact">Contacter JULA</TextLink>
        </section>
      )}
    </>
  );
}
