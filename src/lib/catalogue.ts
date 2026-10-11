export type ProductStatus =
  | "concept"
  | "in_development"
  | "coming_soon"
  | "approved"
  | "available"
  | "discontinued";
export type RangeId =
  "tea" | "herbal" | "latte" | "cacao" | "coffee" | "flower" | "roasted";
export type Taste = "Floral" | "Roasted" | "Spiced" | "Fruity" | "Earthy";
export type MediaKey =
  "tea" | "matcha" | "coffee" | "cacao" | "botanical" | "jasmine" | "oriental";

export interface Range {
  id: RangeId;
  name: string;
  title: string;
  description: string;
  longDescription: string;
  image: MediaKey;
  accent: string;
  later?: boolean;
  context: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  range: RangeId;
  status: ProductStatus;
  publicPreview: boolean;
  description: string;
  tastes: Taste[];
  image: MediaKey;
  proposedOrigin?: string;
  originVerified: boolean;
  ingredients: string[] | null;
  allergens: string[] | null;
  allergenReview: string;
  preparation: {
    steps: string[];
    temperature?: number;
    duration?: string;
  } | null;
  netQuantity: string | null;
  servings: number | null;
  packaging: string | null;
  price: number | null;
  currency: "EUR";
  stock: number | null;
  storage: string | null;
  publicationApproved: boolean;
  developmentNotes?: string;
}

export const ranges: Range[] = [
  {
    id: "tea",
    name: "GO TEA",
    title: "A leaf. A place. A character.",
    description:
      "Origin-led teas and thoughtful blends, with room for each leaf to speak.",
    longDescription:
      "From Japanese green teas to Taiwanese oolongs and Indian black teas, this family explores distinct ways of growing and preparing the tea leaf. Original blends are being developed alongside these origin-led selections.",
    image: "tea",
    accent: "#526A4F",
    context:
      "Sencha, Oriental Beauty and Darjeeling are different tea traditions, not interchangeable flavours. Our selection is still being tasted and reviewed.",
  },
  {
    id: "herbal",
    name: "GO HERBAL",
    title: "Beyond the tea leaf.",
    description:
      "Fruit, flowers and spices, brought together in considered infusions.",
    longDescription:
      "A family of infusions built around real plant ingredients. Citrus, fruit and spice combinations are being explored for their balance and character, rather than for health promises.",
    image: "botanical",
    accent: "#93624A",
    context:
      "Herbal infusions are distinct from teas made with Camellia sinensis. Final compositions, botanical identities and preparation methods require review.",
  },
  {
    id: "latte",
    name: "GO LATTÉ",
    title: "Something a little more rounded.",
    description:
      "Dry drink concentrates to prepare with milk or a suitable plant-based drink.",
    longDescription:
      "Matcha, turmeric, roasted sesame and other ingredients suggest different directions for this family. The concentrates are in development; texture, dispersion and the choice of milk or plant-based drink are part of that work.",
    image: "matcha",
    accent: "#A77544",
    context:
      "A milk-free concentrate is not an allergen-free drink. Recipe and cross-contact information must be confirmed for every reference.",
  },
  {
    id: "cacao",
    name: "GO CACAO",
    title: "Let cocoa take the lead.",
    description:
      "An Indian cocoa project, with distinctive accents under exploration.",
    longDescription:
      "Pure cocoa and a small collection of cocoa-based creations are being developed. The aim is a recognisable cocoa character, with carefully balanced accents rather than a long list of additions.",
    image: "cacao",
    accent: "#795049",
    context:
      "Origin, finished recipes, quantities and preparation instructions remain subject to batch selection and approval.",
  },
  {
    id: "coffee",
    name: "GO COFFEE",
    title: "Coffee with its own identity.",
    description:
      "Indian Arabica and Kaapi Royale Robusta, explored on their own terms.",
    longDescription:
      "The coffee programme compares actual Indian Arabica and Robusta batches. Beans, ground coffee and compatible soft pods are under consideration. Premium instant coffee is a future project, not a launch offer on this site.",
    image: "coffee",
    accent: "#735640",
    context:
      "Kaapi Royale is a proposed coffee reference, not proof of an approved supplier relationship. Formats and roasting profiles remain to be confirmed.",
  },
  {
    id: "flower",
    name: "GO FLOWER",
    title: "An infusion that unfolds.",
    description:
      "Floral infusions and blooming teas: taste, movement and a moment of attention.",
    longDescription:
      "Blooming teas open slowly in water. JULA is exploring existing supplier creations first, with taste and consistent opening behaviour considered alongside the visual experience.",
    image: "jasmine",
    accent: "#926B7C",
    context:
      "Every flower and plant part needs its own food-status and safety review. No final creation or accessory box is confirmed.",
  },
  {
    id: "roasted",
    name: "GO ROASTED",
    title: "A quieter, toasted direction.",
    description: "Roasted plant infusions. A family for a later chapter.",
    longDescription:
      "Black soybean, buckwheat and brown rice preparations are possible directions for future development. This family is outside the immediate launch and has no confirmed commercial format.",
    image: "coffee",
    accent: "#8A734C",
    later: true,
    context:
      "Coming later. Kuromame, sobacha and hyeonmi-cha have distinct cultural and ingredient contexts; no products in this family are offered for purchase.",
  },
];

const base = {
  status: "in_development" as const,
  publicPreview: true,
  originVerified: false,
  ingredients: null,
  allergens: null,
  preparation: null,
  netQuantity: null,
  servings: null,
  packaging: null,
  price: null,
  currency: "EUR" as const,
  stock: null,
  storage: null,
  publicationApproved: false,
};

export const products: Product[] = [
  {
    ...base,
    id: "oriental-beauty",
    slug: "oriental-beauty",
    name: "Oriental Beauty",
    range: "tea",
    tastes: ["Floral", "Fruity"],
    image: "oriental",
    proposedOrigin: "Taiwan",
    description:
      "A Taiwanese oolong direction, explored for its aromatic character. The final batch and tasting notes are still to be selected.",
    allergenReview:
      "Ingredients and potential cross-contact require confirmation.",
  },
  {
    ...base,
    id: "jasmine-tea",
    slug: "jasmine-tea",
    name: "Jasmine tea",
    range: "tea",
    tastes: ["Floral"],
    image: "jasmine",
    proposedOrigin: "China",
    description:
      "A tea scented with real jasmine flowers is the intended direction. The batch, scenting process and final composition require verification.",
    allergenReview:
      "Ingredients and potential cross-contact require confirmation.",
  },
  {
    ...base,
    id: "darjeeling",
    slug: "darjeeling-second-flush",
    name: "Darjeeling Second Flush",
    range: "tea",
    tastes: ["Fruity", "Earthy"],
    image: "tea",
    proposedOrigin: "India",
    description:
      "A second-flush Darjeeling selection under exploration. Estate, harvest and final sensory description will follow batch approval.",
    allergenReview:
      "Ingredients and potential cross-contact require confirmation.",
  },
  {
    ...base,
    id: "sencha",
    slug: "sencha",
    name: "Sencha",
    range: "tea",
    tastes: ["Earthy"],
    image: "tea",
    proposedOrigin: "Japan",
    description:
      "A Japanese green tea direction. Producer, harvest and preparation parameters remain part of the selection work.",
    allergenReview:
      "Ingredients and potential cross-contact require confirmation.",
  },
  {
    ...base,
    id: "yuzu-herbal",
    slug: "yuzu-lemongrass-ginger",
    name: "Yuzu, lemongrass & ginger",
    range: "herbal",
    tastes: ["Fruity", "Spiced"],
    image: "botanical",
    description:
      "A proposed citrus-and-spice infusion. Its balance and exact botanical composition are being reviewed.",
    allergenReview:
      "Final ingredients, botanical identity and cross-contact information are pending.",
  },
  {
    ...base,
    id: "rose-herbal",
    slug: "hibiscus-pomegranate-rose",
    name: "Hibiscus, pomegranate & rose",
    range: "herbal",
    tastes: ["Floral", "Fruity"],
    image: "jasmine",
    description:
      "A proposed fruit-and-flower combination. The final recipe and its sensory profile are not yet confirmed.",
    allergenReview:
      "Final ingredients and potential cross-contact require confirmation.",
  },
  {
    ...base,
    id: "golden-latte",
    slug: "golden-latte",
    name: "Golden Latte",
    range: "latte",
    tastes: ["Spiced", "Earthy"],
    image: "botanical",
    description:
      "A turmeric-led concentrate with ginger and spice under development. Final formula, serving size and preparation method are pending.",
    allergenReview:
      "Milk in the prepared drink depends on your choice of liquid. Concentrate ingredients and cross-contact are not yet approved.",
  },
  {
    ...base,
    id: "matcha-latte",
    slug: "matcha-latte",
    name: "Japanese Matcha",
    range: "latte",
    tastes: ["Earthy"],
    image: "matcha",
    proposedOrigin: "Japan",
    description:
      "A plain Japanese matcha direction, intended for preparation with a suitable milk or plant-based drink. Batch selection and dosing are still in progress.",
    allergenReview:
      "The liquid you choose may contain milk, soy or other allergens. Final product and cross-contact details require review.",
  },
  {
    ...base,
    id: "sesame-kinako",
    slug: "black-sesame-kinako",
    name: "Black sesame & kinako",
    range: "latte",
    tastes: ["Roasted"],
    image: "cacao",
    description:
      "A proposed concentrate combining roasted black sesame and kinako, roasted soybean flour. Texture and final proportions remain under development.",
    allergenReview:
      "The proposed ingredients include SESAME and SOY. This is not a complete approved allergen declaration.",
  },
  {
    ...base,
    id: "kulfi-latte",
    slug: "pistachio-cardamom-saffron",
    name: "Pistachio, cardamom & saffron",
    range: "latte",
    tastes: ["Spiced"],
    image: "matcha",
    description:
      "A kulfi-inspired drink direction, rather than the frozen dessert itself. The recipe, sourcing and preparation require approval.",
    allergenReview:
      "The proposed recipe includes PISTACHIO (tree nut). Other ingredients and cross-contact are pending.",
  },
  {
    ...base,
    id: "pure-cocoa",
    slug: "pure-cocoa",
    name: "Pure cocoa",
    range: "cacao",
    tastes: ["Roasted", "Earthy"],
    image: "cacao",
    proposedOrigin: "India",
    description:
      "An Indian cocoa selection in development. Final batch, composition, format and preparation will be published after review.",
    allergenReview:
      "Final composition and possible shared-line allergens, including milk, require confirmation.",
  },
  {
    ...base,
    id: "arabica",
    slug: "indian-arabica",
    name: "Indian Arabica",
    range: "coffee",
    tastes: ["Roasted"],
    image: "coffee",
    proposedOrigin: "India",
    description:
      "An Arabica selection comparing actual Indian batches. No estate, roast, grind or selling format has been confirmed for this preview.",
    allergenReview:
      "Composition and processing-site cross-contact information are pending.",
  },
  {
    ...base,
    id: "robusta",
    slug: "kaapi-royale-robusta",
    name: "Kaapi Royale Robusta",
    range: "coffee",
    tastes: ["Roasted", "Earthy"],
    image: "coffee",
    proposedOrigin: "India",
    description:
      "A Kaapi Royale Robusta direction. The actual batch, roast and formats are still to be validated.",
    allergenReview:
      "Composition and processing-site cross-contact information are pending.",
  },
  {
    ...base,
    id: "blooming-tea",
    slug: "blooming-tea",
    name: "Blooming tea exploration",
    range: "flower",
    tastes: ["Floral"],
    image: "jasmine",
    description:
      "A preview of the blooming-tea concept, not a selected commercial creation. Flowers, tea base and assembly materials require individual review.",
    allergenReview:
      "Full botanical composition, food status and allergen information are not yet confirmed.",
  },
];

export interface DiscoveryBox {
  slug: string;
  name: string;
  range: RangeId;
  image: MediaKey;
  description: string;
  proposedFormat: string;
}

export const boxes: DiscoveryBox[] = [
  {
    slug: "tea-discovery",
    name: "The tea discovery",
    range: "tea",
    image: "oriental",
    description:
      "Explore different tea characters before deciding which you would like to return to.",
    proposedFormat:
      "Proposal: five teas, four bags per tea, 20 cups. Contents and quantities await approval.",
  },
  {
    slug: "herbal-discovery",
    name: "The herbal discoveries",
    range: "herbal",
    image: "botanical",
    description:
      "Two proposed assortments of fruit, flower and spice infusions. The selections remain open.",
    proposedFormat:
      "Proposal: two boxes, each with five varieties and four bags per variety. Not a confirmed offer.",
  },
  {
    slug: "latte-discovery",
    name: "The latte discovery",
    range: "latte",
    image: "matcha",
    description:
      "A proposed selection of drink concentrates, with varied ingredient directions.",
    proposedFormat:
      "Proposal: five flavours and 20 servings. Final recipes and formats are pending.",
  },
  {
    slug: "cacao-discovery",
    name: "The cacao discovery",
    range: "cacao",
    image: "cacao",
    description:
      "A proposed collection of three cocoa creations, selected only after comparative tasting.",
    proposedFormat:
      "Proposal: three creations, six servings each. Contents and quantities await approval.",
  },
];

export function isPublicProduct(product: Product): boolean {
  if (product.status === "concept" || product.status === "discontinued")
    return false;
  if (product.status === "in_development") return product.publicPreview;
  return product.publicationApproved;
}

export function canPurchase(
  product: Product,
  commerceConfigured = false,
): boolean {
  return (
    commerceConfigured &&
    product.status === "available" &&
    product.publicationApproved &&
    product.price !== null &&
    product.price > 0 &&
    product.stock !== null &&
    product.stock > 0 &&
    product.ingredients !== null &&
    product.allergens !== null &&
    product.packaging !== null
  );
}

export function publicProducts(): Product[] {
  return products.filter(isPublicProduct);
}
export function rangeById(id: string): Range | undefined {
  return ranges.find((range) => range.id === id);
}
export function productBySlug(slug: string): Product | undefined {
  return publicProducts().find((product) => product.slug === slug);
}
export function statusLabel(status: ProductStatus): string {
  return {
    concept: "Not published",
    in_development: "Development preview",
    coming_soon: "Coming soon",
    approved: "Not yet on sale",
    available: "Available",
    discontinued: "No longer offered",
  }[status];
}

export function filterProducts(
  items: Product[],
  query: string,
  range: string,
  taste: string,
  sort: string,
): Product[] {
  const search = query.trim().toLocaleLowerCase("en");
  const result = items.filter(
    (product) =>
      isPublicProduct(product) &&
      (range === "all" || product.range === range) &&
      (taste === "all" || product.tastes.includes(taste as Taste)) &&
      `${product.name} ${product.description} ${product.proposedOrigin ?? ""} ${product.tastes.join(" ")}`
        .toLocaleLowerCase("en")
        .includes(search),
  );
  if (sort === "name")
    result.sort((first, second) => first.name.localeCompare(second.name));
  if (sort === "family")
    result.sort((first, second) => first.range.localeCompare(second.range));
  return result;
}
