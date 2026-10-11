export const pages = {
  "our-story": {
    title: "Our story",
    eyebrow: "The house · Liège, Belgium",
    heading: "A cup can hold a little more.",
    description:
      "A beverage house in development, exploring distinct Asian ingredients and drink traditions from Liège, Belgium.",
  },
  origins: {
    title: "Origins & producers",
    eyebrow: "Context, with evidence",
    heading: "Every ingredient comes from somewhere.",
    description:
      "Our approach to sourcing, origin information, supplier qualification and verified producer stories.",
  },
  preparation: {
    title: "Prepare JULA",
    eyebrow: "A considered preparation",
    heading: "The recipe continues in the cup.",
    description:
      "Explore general preparation context by family. Final product-specific instructions are pending approval.",
  },
  commitments: {
    title: "Our commitments",
    eyebrow: "Principles, not shortcuts",
    heading: "Good intentions. Clear responsibilities.",
    description:
      "Taste, cultural respect, transparency, creativity and responsibility. Intended standards, not unsupported certifications.",
  },
  professionals: {
    title: "For professionals",
    eyebrow: "Retail · Hospitality · Companies",
    heading: "Your setting. A different kind of cup.",
    description:
      "Explore our professional directions and prepare an enquiry about retail, hospitality, gifting or personalised packaging.",
  },
  contact: {
    title: "Contact JULA",
    eyebrow: "A conversation with the house",
    heading: "What do you have in mind?",
    description:
      "Prepare a JULA enquiry. The receiving service is not active until configured and approved.",
  },
  faq: {
    title: "Questions & answers",
    eyebrow: "The useful details",
    heading: "A few things you might be wondering.",
    description:
      "Pre-launch status, proposed products, allergies, sourcing, professional enquiries and future services.",
  },
  passport: {
    title: "JULA Passport",
    eyebrow: "A future transparency concept",
    heading: "A closer look, with a clear source.",
    description:
      "A preview only. No verified batch records, QR lookup, origin certificates or account service are available yet.",
  },
  account: {
    title: "Your account",
    eyebrow: "A future service",
    heading: "A place for your JULA, later.",
    description:
      "Accounts are not active. No sign-in, order history or account registration is offered.",
  },
  bag: {
    title: "Your bag",
    eyebrow: "Purchasing is not yet open",
    heading: "A collection to explore. Not yet to buy.",
    description:
      "The catalogue is a development preview. No cart, checkout, payment or stock reservation is available.",
  },
  cookies: {
    title: "Cookie preferences",
    eyebrow: "Your browser · Your preferences",
    heading: "Only what is needed, for now.",
    description:
      "Manage locally stored preferences. No analytics or advertising trackers are installed.",
  },
  shipping: {
    title: "Shipping & delivery",
    eyebrow: "Commercial policy · Working draft",
    heading: "Shipping & delivery",
    description:
      "Shipping arrangements are not confirmed. No orders or delivery commitments are accepted.",
  },
  returns: {
    title: "Returns & refunds",
    eyebrow: "Commercial policy · Working draft",
    heading: "Returns & refunds",
    description:
      "Returns and withdrawal policy structure for review before commerce opens.",
  },
  privacy: {
    title: "Privacy notice",
    eyebrow: "Privacy · Working draft",
    heading: "Privacy notice",
    description:
      "Current services and privacy draft. No analytics or account service is installed.",
  },
  terms: {
    title: "Terms & conditions",
    eyebrow: "Commercial policy · Working draft",
    heading: "Terms & conditions",
    description:
      "Development previews are not offers for sale. Commercial terms await review.",
  },
  accessibility: {
    title: "Accessibility",
    eyebrow: "A more usable experience",
    heading: "Accessibility",
    description:
      "Our accessibility design approach and remaining review requirements. No formal certification is claimed.",
  },
  nl: {
    title: "Nederlands",
    eyebrow: "Language availability",
    heading: "Dutch is not yet available.",
    description:
      "Reviewed Dutch content is not yet available. The English website is active.",
  },
} as const;

export type PageId = keyof typeof pages;
export function pageById(id: string) {
  return Object.hasOwn(pages, id) ? pages[id as PageId] : undefined;
}
