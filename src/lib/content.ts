import { assetPath, staticHosting } from "./hosting";
import type { MediaKey } from "./catalogue";
import type { Locale } from "./languages";

export const media = {
  tea: {
    src: assetPath("/images/tea-ritual.webp"),
    alt: "Tea and ceramics in a contextual beverage photograph",
    caption: "Contextual photography. Not a JULA product or producer.",
  },
  matcha: {
    src: assetPath("/images/matcha.webp"),
    alt: "A green tea drink in a contextual photograph",
    caption:
      "Contextual photography. Final JULA product appearance may differ.",
  },
  coffee: {
    src: assetPath("/images/coffee.webp"),
    alt: "Coffee in a ceramic cup, shown as beverage context",
    caption: "Contextual photography. Not a selected JULA batch.",
  },
  cacao: {
    src: assetPath("/images/cacao.webp"),
    alt: "Cocoa and chocolate ingredients in a contextual photograph",
    caption: "Contextual photography. Not a JULA product.",
  },
  botanical: {
    src: assetPath("/images/botanicals.webp"),
    alt: "Botanical ingredients and a cup in supplied JULA development artwork",
    caption:
      "JULA development illustration. Not final packaging or provenance evidence.",
  },
  jasmine: {
    src: assetPath("/images/jasmine-art.webp"),
    alt: "Jasmine, tea and a cup in supplied JULA development artwork",
    caption:
      "JULA development illustration. Not final packaging or producer photography.",
  },
  oriental: {
    src: assetPath("/images/oriental-art.webp"),
    alt: "An illustrated cup, tea leaves and landscape from JULA Oriental Beauty development artwork",
    caption:
      "JULA development illustration. Not final packaging or verified origin imagery.",
  },
} as const;

export const site = {
  name: "JULA",
  location: "Liège, Belgium",
  language: "en",
  description:
    "A pre-launch beverage house exploring Asian teas, infusions, coffee, cacao and original drink recipes. Based in Liège, Belgium.",
  commerceEnabled: false,
  accountsEnabled: false,
};

export const locales = [
  { code: "en", name: "English", enabled: true },
  { code: "fr", name: "Français", enabled: true },
  { code: "nl", name: "Nederlands", enabled: false },
] as const;

export function localisedMedia(name: MediaKey, locale: Locale) {
  const asset = media[name];
  if (locale === "en") return asset;
  const alt = {
    tea: "Thé et céramique dans une photographie de contexte",
    matcha: "Boisson au thé vert dans une photographie de contexte",
    coffee: "Café dans une tasse en céramique, photographie de contexte",
    cacao: "Cacao et chocolat dans une photographie de contexte",
    botanical: "Plantes et tasse dans une illustration de développement JULA",
    jasmine: "Jasmin, thé et tasse dans une illustration de développement JULA",
    oriental:
      "Tasse, feuilles de thé et paysage dans une illustration Oriental Beauty JULA",
  }[name];
  return {
    ...asset,
    alt,
    caption: ["botanical", "jasmine", "oriental"].includes(name)
      ? "Illustration de développement JULA. Ni emballage final ni preuve d'origine ou de producteur."
      : "Photographie de contexte. Ni produit final ni lot ou producteur JULA sélectionné.",
  };
}

export const principles = [
  {
    title: "Taste first",
    text: "The pleasure of drinking comes before the concept, the colour or the story. A second cup is a better ambition than a louder claim.",
  },
  {
    title: "Cultural respect",
    text: "Japanese green tea, Indian chai and Taiwanese oolong belong to distinct traditions. We want to describe them with their own context, not fold them into a single idea of Asia.",
  },
  {
    title: "Transparency",
    text: "Published origins, ingredients and producer relationships should be supported by records. A missing answer should remain a missing answer.",
  },
  {
    title: "Creativity",
    text: "New combinations can be curious without becoming complicated. Each ingredient should have a reason to be in the cup.",
  },
  {
    title: "Responsibility",
    text: "Supplier qualification, traceability and quality checks are intended parts of the process. Commitments are not the same as demonstrated achievements.",
  },
];

export const faqs = [
  {
    question: "Can I buy JULA products now?",
    answer:
      "Not yet. This is a pre-launch website. The catalogue contains labelled development previews, not products available for purchase.",
  },
  {
    question: "Are the recipes and boxes final?",
    answer:
      "No. Final selections, ingredients, quantities, preparation instructions and packaging require approval. Proposed box quantities are identified as proposals.",
  },
  {
    question: "Where is JULA based?",
    answer:
      "The project is centred in Liège, Belgium. Its initial market is Belgium. A legal business address and company registration details have not yet been supplied for this website.",
  },
  {
    question: "Does JULA own the farms or factories?",
    answer:
      "No ownership claim is made. The project plans to work with sourcing, manufacturing and other specialist partners. Confirmed public partner information will require evidence and permission.",
  },
  {
    question: "Are the drinks suitable for my allergy?",
    answer:
      "Do not use these previews to make an allergy decision. Ingredients and cross-contact information are awaiting review. Proposed sesame–kinako recipes include sesame and soy, and pistachio recipes include a tree nut.",
  },
  {
    question: "Are products organic or Fairtrade certified?",
    answer:
      "No certification claim is made on this website. Certification and use of any associated mark require product-specific evidence and approval.",
  },
  {
    question: "Can my business request supply or personalised packaging?",
    answer:
      "The professional enquiry form can help prepare your request. Supply, personalisation, quantities, prices and lead times depend on feasibility and business confirmation. Submission is unavailable until an approved receiving service is configured.",
  },
  {
    question: "Which countries will you deliver to?",
    answer:
      "Belgium is the intended initial market. Delivery countries, carriers, charges and lead times are not yet confirmed. No shipping commitments are made.",
  },
  {
    question: "What is JULA Passport?",
    answer:
      "A future transparency concept linking a product to verified information, preparation and, where supported, origin records. The current page is a preview and does not provide batch traceability or account services.",
  },
];

export const legalPages = {
  shipping: {
    title: "Shipping & delivery",
    intro:
      "Delivery arrangements are being defined. No orders or payments are accepted on this website.",
    sections: [
      {
        title: "Before sales open",
        text: "JULA must confirm delivery countries, carriers, delivery methods, charges, fulfilment timing, parcel tracking and incident procedures. These details will be shown before a purchase is concluded.",
      },
      {
        title: "Current status",
        text: "Belgium is the planned initial market, not a shipping guarantee. No free-delivery threshold or delivery date is currently offered.",
      },
    ],
  },
  returns: {
    title: "Returns & refunds",
    intro:
      "A product-specific returns and withdrawal policy requires qualified review before commerce opens.",
    sections: [
      {
        title: "Withdrawal rights",
        text: "No blanket food-product exclusion is asserted. Applicable consumer rights and any statutory exceptions must be assessed for the actual products and sales markets.",
      },
      {
        title: "Future service",
        text: "Return instructions, the contact channel, refund handling and damaged-parcel procedures must be confirmed. This website does not take orders or process refunds.",
      },
    ],
  },
  privacy: {
    title: "Privacy notice",
    intro:
      "Working draft for this pre-launch website. It is not an approved commercial privacy policy.",
    sections: [
      {
        title: "Current services",
        text: "No analytics, advertising trackers or account service are installed. Optional cookie preferences are stored locally in your browser. Hosting infrastructure may handle ordinary request logs; the operator, hosting provider and retention terms require confirmation.",
      },
      {
        title: "Forms",
        text: staticHosting
          ? "Forms on this GitHub Pages edition validate drafts only in your browser. The fields are not transmitted, saved by the application or used to create subscriptions. GitHub Pages may process ordinary hosting request logs; hosting terms and controller details require review before public commercial launch."
          : "Checking a form sends its fields to this website's server for validation. The application does not persist the draft, and with no approved receiving service configured it does not forward the fields or create a subscription. Hosting request logs may still be handled by infrastructure. If an approved receiving service is configured, submitted data is forwarded to it. Controller details, purpose, lawful basis, processors, retention, security and rights handling must be reviewed before activation.",
      },
      {
        title: "Your information",
        text: "Do not submit sensitive information. Company identity, privacy contact details, service providers and a rights-request channel remain to be supplied. This draft must be replaced or approved before public launch.",
      },
    ],
  },
  terms: {
    title: "Terms & conditions",
    intro:
      "Draft structure only. Commercial terms have not been approved and purchasing is disabled.",
    sections: [
      {
        title: "Information and previews",
        text: "Development previews are not offers for sale. Product composition, format, origin, pricing and availability may change before approval. Illustrations and contextual photographs are not final product representations.",
      },
      {
        title: "Required commercial review",
        text: "The legal operator, registration and VAT details, consumer and professional terms, payment, delivery, withdrawal, complaints and applicable contractual rules must be supplied and reviewed before transactions are enabled.",
      },
    ],
  },
  accessibility: {
    title: "Accessibility",
    intro:
      "JULA aims for a usable experience with keyboard navigation, readable content and responsive layouts. No formal WCAG certification is claimed.",
    sections: [
      {
        title: "Design approach",
        text: "The interface includes semantic headings, labelled controls, visible focus indicators, a skip link, keyboard-operable navigation, image alternatives and reduced-motion support.",
      },
      {
        title: "Ongoing work",
        text: "Automated and manual checks inform development but do not replace an independent accessibility audit. A supported feedback channel and any legally required accessibility statement must be confirmed before public launch.",
      },
    ],
  },
} as const;

export function localisedPath(path: string, locale: string): string {
  return `/${locale}${path === "/" ? "" : path}`;
}
