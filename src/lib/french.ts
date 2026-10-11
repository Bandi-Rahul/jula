import {
  boxes,
  publicProducts,
  ranges,
  type RangeId,
  type Taste,
} from "./catalogue";
import { pages } from "./pages";

export const tastesFrench: Record<Taste, string> = {
  Floral: "Floral",
  Roasted: "Torréfié",
  Spiced: "Épicé",
  Fruity: "Fruité",
  Earthy: "Végétal et terreux",
};

export const rangesFrench: Record<
  RangeId,
  { title: string; description: string; context: string }
> = {
  tea: {
    title: "Une feuille. Un lieu. Un caractère.",
    description:
      "Des thés d'origine et des mélanges réfléchis, pour laisser chaque feuille s'exprimer.",
    context:
      "Sencha japonais, oolong taïwanais et thé noir indien ont des traditions distinctes. Les lots, producteurs et paramètres de préparation restent à sélectionner et à vérifier.",
  },
  herbal: {
    title: "Au-delà de la feuille de thé.",
    description:
      "Fruits, fleurs et épices réunis dans des infusions équilibrées.",
    context:
      "Les infusions de plantes se distinguent du thé issu de Camellia sinensis. La composition botanique et la sécurité alimentaire doivent être vérifiées. Aucune promesse de santé n'est formulée.",
  },
  latte: {
    title: "Une tasse tout en rondeur.",
    description:
      "Des concentrés secs à préparer avec du lait ou une boisson végétale adaptée.",
    context:
      "Matcha, curcuma, sésame et autres ingrédients ouvrent plusieurs pistes. La texture, la dispersion et les proportions restent en développement. Sans lait ne signifie pas sans allergènes.",
  },
  cacao: {
    title: "Laisser le cacao s'exprimer.",
    description:
      "Un projet autour du cacao indien et de créations aux accents distinctifs.",
    context:
      "Cacao pur et créations cacaotées sont à l'étude. L'origine, les recettes, les quantités et les instructions doivent être validées pour chaque lot.",
  },
  coffee: {
    title: "Un café avec sa propre identité.",
    description:
      "Arabica indien et Robusta Kaapi Royale, explorés pour leur caractère.",
    context:
      "Les lots indiens sont comparés. Grains, café moulu et dosettes souples sont envisagés, sans format ni torréfaction confirmés. Le café instantané premium est un projet ultérieur.",
  },
  flower: {
    title: "Une infusion qui s'épanouit.",
    description:
      "Infusions florales et thés fleuris : le goût, le mouvement et un moment d'attention.",
    context:
      "Les créations de fournisseurs sont explorées avant toute sélection. Chaque fleur, partie de plante et matériau d'assemblage nécessite une vérification alimentaire et de sécurité.",
  },
  roasted: {
    title: "Une direction doucement grillée.",
    description:
      "Des infusions de plantes torréfiées, pour un prochain chapitre.",
    context:
      "Soja noir, sarrasin et riz brun sont des pistes futures. Kuromame, sobacha et hyeonmi-cha ont des contextes culturels distincts. Aucun produit ni format commercial n'est confirmé.",
  },
};

export const productCopyFrench: Record<
  string,
  { name: string; description: string; allergenReview: string }
> = {
  "oriental-beauty": {
    name: "Oriental Beauty",
    description:
      "Une piste d'oolong taïwanais pour son caractère aromatique. Le lot final et les notes de dégustation restent à sélectionner.",
    allergenReview:
      "Les ingrédients et les risques de contact croisé doivent être confirmés.",
  },
  "jasmine-tea": {
    name: "Thé au jasmin",
    description:
      "Un thé parfumé avec de véritables fleurs de jasmin est envisagé. Le lot, le procédé de parfumage et la composition finale doivent être vérifiés.",
    allergenReview:
      "Les ingrédients et les risques de contact croisé doivent être confirmés.",
  },
  "darjeeling-second-flush": {
    name: "Darjeeling Second Flush",
    description:
      "Un Darjeeling de seconde récolte à l'étude. Le domaine, la récolte et le profil sensoriel seront précisés après validation du lot.",
    allergenReview:
      "Les ingrédients et les risques de contact croisé doivent être confirmés.",
  },
  sencha: {
    name: "Sencha",
    description:
      "Une piste de thé vert japonais. Producteur, récolte et paramètres de préparation font encore partie de la sélection.",
    allergenReview:
      "Les ingrédients et les risques de contact croisé doivent être confirmés.",
  },
  "yuzu-lemongrass-ginger": {
    name: "Yuzu, citronnelle et gingembre",
    description:
      "Une infusion d'agrumes et d'épices envisagée. Son équilibre et sa composition botanique exacte sont en cours d'étude.",
    allergenReview:
      "Ingrédients finaux, identité botanique et contacts croisés restent à vérifier.",
  },
  "hibiscus-pomegranate-rose": {
    name: "Hibiscus, grenade et rose",
    description:
      "Une association de fruits et de fleurs envisagée. La recette finale et le profil sensoriel ne sont pas encore confirmés.",
    allergenReview:
      "Les ingrédients et les risques de contact croisé doivent être confirmés.",
  },
  "golden-latte": {
    name: "Golden Latte",
    description:
      "Un concentré à base de curcuma, de gingembre et d'épices en développement. Formule, portion et préparation restent à valider.",
    allergenReview:
      "Le lait dépend du liquide choisi. Les ingrédients du concentré et les contacts croisés ne sont pas encore validés.",
  },
  "matcha-latte": {
    name: "Matcha japonais",
    description:
      "Un matcha japonais nature à préparer avec un lait ou une boisson végétale adaptée. La sélection du lot et le dosage sont en cours.",
    allergenReview:
      "Le liquide choisi peut contenir du lait, du soja ou d'autres allergènes. Produit final et contacts croisés restent à vérifier.",
  },
  "black-sesame-kinako": {
    name: "Sésame noir et kinako",
    description:
      "Un concentré de sésame noir torréfié et de kinako, une farine de soja grillé. Texture et proportions restent en développement.",
    allergenReview:
      "Les ingrédients envisagés comprennent du SÉSAME et du SOJA. Ceci n'est pas une déclaration complète et validée des allergènes.",
  },
  "pistachio-cardamom-saffron": {
    name: "Pistache, cardamome et safran",
    description:
      "Une boisson inspirée du kulfi, et non le dessert glacé lui-même. Recette, approvisionnement et préparation restent à valider.",
    allergenReview:
      "La recette envisagée comprend de la PISTACHE (fruit à coque). Les autres ingrédients et contacts croisés restent à vérifier.",
  },
  "pure-cocoa": {
    name: "Cacao pur",
    description:
      "Une sélection de cacao indien en développement. Lot, composition, format et préparation seront publiés après validation.",
    allergenReview:
      "La composition finale et les allergènes éventuels des lignes partagées, dont le lait, doivent être confirmés.",
  },
  "indian-arabica": {
    name: "Arabica indien",
    description:
      "Une sélection comparant des lots réels d'Arabica indien. Domaine, torréfaction, mouture et format commercial ne sont pas confirmés.",
    allergenReview:
      "Composition et risques de contact croisé sur le site de transformation restent à vérifier.",
  },
  "kaapi-royale-robusta": {
    name: "Kaapi Royale Robusta",
    description:
      "Une piste Kaapi Royale Robusta. Lot réel, torréfaction et formats restent à valider.",
    allergenReview:
      "Composition et risques de contact croisé sur le site de transformation restent à vérifier.",
  },
  "blooming-tea": {
    name: "Exploration du thé fleuri",
    description:
      "Un aperçu du concept de thé fleuri, pas une création commerciale sélectionnée. Fleurs, base de thé et matériaux d'assemblage nécessitent une vérification individuelle.",
    allergenReview:
      "Composition botanique complète, statut alimentaire et allergènes ne sont pas confirmés.",
  },
};

export function frenchProducts() {
  return publicProducts().map((product) => ({
    ...product,
    ...productCopyFrench[product.slug],
    proposedOrigin: product.proposedOrigin
      ? ({ Taiwan: "Taïwan", China: "Chine", India: "Inde", Japan: "Japon" }[
          product.proposedOrigin
        ] ?? product.proposedOrigin)
      : undefined,
  }));
}

export const boxCopyFrench: Record<
  string,
  { name: string; description: string; proposedFormat: string }
> = {
  "tea-discovery": {
    name: "La découverte des thés",
    description:
      "Explorer plusieurs caractères de thé avant de retrouver votre préféré.",
    proposedFormat:
      "Proposition : cinq thés, quatre sachets par thé, soit 20 tasses. Contenu et quantités à valider.",
  },
  "herbal-discovery": {
    name: "Les découvertes des infusions",
    description:
      "Deux assortiments envisagés de fruits, fleurs et épices. Les sélections restent ouvertes.",
    proposedFormat:
      "Proposition : deux coffrets, chacun avec cinq variétés et quatre sachets par variété. Ce n'est pas une offre confirmée.",
  },
  "latte-discovery": {
    name: "La découverte des lattés",
    description:
      "Une sélection envisagée de concentrés, aux ingrédients variés.",
    proposedFormat:
      "Proposition : cinq saveurs et 20 portions. Recettes et formats finaux à valider.",
  },
  "cacao-discovery": {
    name: "La découverte du cacao",
    description:
      "Trois créations cacaotées envisagées, à sélectionner après une dégustation comparative.",
    proposedFormat:
      "Proposition : trois créations, six portions chacune. Contenu et quantités à valider.",
  },
};

export const frenchPages: Record<
  string,
  {
    title: string;
    heading: string;
    description: string;
    sections: [string, string][];
  }
> = {
  "our-story": {
    title: "Notre histoire",
    heading: "Une tasse peut contenir un peu plus.",
    description:
      "Une maison de boissons en développement à Liège, explorant les ingrédients et traditions d'Asie dans leur singularité.",
    sections: [
      [
        "Plusieurs traditions, pas une seule idée de l'Asie",
        "Un thé vert japonais n'est pas un oolong taïwanais. Un café indien n'est pas une infusion épicée. Nous voulons comprendre chaque ingrédient avant de lui donner une recette et chaque tradition avant de raconter son histoire.",
      ],
      [
        "Le plaisir de boire, d'abord",
        "Une belle histoire ne remplace jamais une bonne tasse. L'équilibre, la texture, la finale et l'envie d'en reprendre guident le développement.",
      ],
      [
        "Un point de départ belge",
        "JULA est un projet indépendant basé à Liège. La Belgique est son premier marché envisagé. Nous ne revendiquons aucune propriété de fermes, domaines ou usines.",
      ],
      [
        "Ouverts sur ce qui reste à faire",
        "Recettes, approvisionnement, emballages et conditions commerciales sont encore en développement. Ces aperçus ne présentent pas le travail comme terminé.",
      ],
    ],
  },
  origins: {
    title: "Origines et producteurs",
    heading: "Chaque ingrédient vient de quelque part.",
    description:
      "Les origines envisagées sont des pistes de développement, pas des origines commerciales vérifiées ni des partenariats confirmés.",
    sections: [
      [
        "Japon",
        "Sencha et matcha sont à l'étude. Producteur, récolte et transformation devront être documentés.",
      ],
      [
        "Taïwan",
        "Une piste Oriental Beauty. Un lot réel et ses documents d'origine doivent précéder tout récit définitif.",
      ],
      [
        "Inde",
        "Thé Darjeeling, café et cacao sont envisagés. Domaines, lots et partenaires restent à confirmer pour publication.",
      ],
      [
        "Chine",
        "Thé au jasmin et thés fleuris de fournisseurs sont explorés. Producteurs et composition botanique nécessitent une vérification.",
      ],
      [
        "Les documents avant le récit",
        "Nous prévoyons de qualifier les fournisseurs, comparer les échantillons, vérifier ingrédients et allergènes, puis publier des faits étayés avec les autorisations nécessaires. Ces étapes ne sont pas des audits déjà réalisés.",
      ],
      [
        "Des images de contexte",
        "Aucun profil nominatif de producteur n'est publié. Les photographies et illustrations ne prouvent ni origine ni relation avec un fournisseur JULA.",
      ],
    ],
  },
  commitments: {
    title: "Nos engagements",
    heading: "De bonnes intentions. Des responsabilités claires.",
    description:
      "Des principes destinés à guider le travail, pas des certifications ou résultats déjà démontrés.",
    sections: [
      [
        "Le goût d'abord",
        "Le plaisir de boire passe avant le concept, la couleur ou le récit. Donner envie d'une deuxième tasse est notre ambition.",
      ],
      [
        "Le respect culturel",
        "Thé japonais, chai indien et oolong taïwanais appartiennent à des traditions distinctes. Nous voulons les décrire dans leur propre contexte.",
      ],
      [
        "La transparence",
        "Origines, ingrédients et relations avec les producteurs doivent être étayés. Une réponse manquante doit rester une réponse manquante.",
      ],
      [
        "La créativité",
        "Chaque ingrédient doit avoir une raison d'être dans la tasse. La curiosité n'impose pas la complication.",
      ],
      [
        "La responsabilité",
        "Qualification des fournisseurs, traçabilité et contrôles qualité font partie du processus envisagé. Aucun statut bio, Fairtrade ou autre certification n'est revendiqué sans preuve spécifique.",
      ],
    ],
  },
  preparation: {
    title: "Préparer JULA",
    heading: "La recette continue dans la tasse.",
    description:
      "Un contexte général de préparation. Les instructions propres à chaque produit restent à valider.",
    sections: [],
  },
  professionals: {
    title: "Pour les professionnels",
    heading: "Votre lieu. Une autre idée de la tasse.",
    description:
      "Commerce, hôtellerie-restauration, cadeaux d'entreprise et personnalisation : préparons votre demande.",
    sections: [
      [
        "Commerces et boutiques spécialisées",
        "Une gamme sélectionnée et des formats découverte sont envisagés. Formats de vente, prix, conditions et réapprovisionnement ne sont pas confirmés.",
      ],
      [
        "Hôtels, cafés et restaurants",
        "Sélections de boissons et accompagnement de préparation sont possibles, selon la maturité des produits et vos besoins.",
      ],
      [
        "Entreprises et cadeaux",
        "Des coffrets pour équipes ou clients sont à l'étude. Aucune quantité fixe, remise de volume ou date n'est proposée.",
      ],
      [
        "Emballages personnalisés",
        "Manchons et personnalisation peuvent être envisagés. Contraintes techniques, impression et faisabilité doivent être évaluées pour chaque demande.",
      ],
    ],
  },
  contact: {
    title: "Contacter JULA",
    heading: "Qu'avez-vous en tête ?",
    description:
      "Une question, une demande éditoriale ou une collaboration ? Préparez votre message. Le service de réception n'est pas actif.",
    sections: [
      [
        "À votre écoute, depuis Liège",
        "Une adresse e-mail publique vérifiée, un téléphone, une adresse juridique et un délai de réponse n'ont pas encore été fournis. Nous n'inventons pas de coordonnées de remplacement.",
      ],
    ],
  },
  faq: {
    title: "Questions et réponses",
    heading: "Quelques questions que vous vous posez peut-être.",
    description:
      "Des réponses claires sur le pré-lancement, les produits, les allergènes et les services futurs.",
    sections: [],
  },
  passport: {
    title: "JULA Passport",
    heading: "Regarder de plus près, avec une source claire.",
    description:
      "Un concept futur de transparence, pas un outil actif de traçabilité ni un certificat d'authenticité.",
    sections: [
      [
        "Un aperçu uniquement",
        "Un futur Passport pourrait relier un produit à sa préparation validée, ses ingrédients et des documents d'origine vérifiés. Aucun lot vérifié, recherche QR ou compte n'est disponible. Des données réelles et un processus de publication sont nécessaires.",
      ],
    ],
  },
  account: {
    title: "Votre compte",
    heading: "Une place pour votre JULA, plus tard.",
    description: "Les comptes ne sont pas actifs.",
    sections: [
      [
        "Aucune inscription",
        "Connexion, mots de passe et historique de commandes ne sont pas proposés. Un fournisseur sécurisé et des procédures de confidentialité validées sont nécessaires avant activation.",
      ],
    ],
  },
  bag: {
    title: "Votre panier",
    heading: "Une collection à explorer. Pas encore à acheter.",
    description: "Les achats ne sont pas ouverts.",
    sections: [
      [
        "Aucune transaction",
        "Aucun panier actif, paiement, réservation de stock ou commande. Prix, emballages et stocks ne sont pas encore validés.",
      ],
    ],
  },
  cookies: {
    title: "Préférences de cookies",
    heading: "Seulement le nécessaire, pour l'instant.",
    description:
      "Gérez les préférences stockées dans votre navigateur. Aucun outil d'analyse ou de publicité n'est installé.",
    sections: [],
  },
  shipping: {
    title: "Expédition et livraison",
    heading: "Expédition et livraison",
    description:
      "Projet de politique commerciale. Aucune commande ou promesse de livraison n'est acceptée.",
    sections: [
      [
        "Avant l'ouverture des ventes",
        "Pays desservis, transporteurs, frais, délais, suivi et traitement des incidents devront être confirmés avant tout achat.",
      ],
      [
        "Statut actuel",
        "La Belgique est le premier marché envisagé, pas une garantie de livraison. Aucun seuil de gratuité ni date de livraison n'est proposé.",
      ],
    ],
  },
  returns: {
    title: "Retours et remboursements",
    heading: "Retours et remboursements",
    description: "Projet à faire vérifier avant l'ouverture des ventes.",
    sections: [
      [
        "Droit de rétractation",
        "Aucune exclusion générale des produits alimentaires n'est affirmée. Les droits applicables et exceptions légales doivent être évalués pour les produits et marchés réels.",
      ],
      [
        "Un service futur",
        "Instructions de retour, contact, remboursements et colis endommagés restent à définir. Aucune commande ni aucun remboursement n'est traité.",
      ],
    ],
  },
  privacy: {
    title: "Confidentialité",
    heading: "Notice de confidentialité",
    description:
      "Projet de notice de pré-lancement, pas une politique commerciale validée.",
    sections: [
      [
        "Services actuels",
        "Aucun outil d'analyse, traceur publicitaire ou compte. Les préférences facultatives sont enregistrées localement. L'hébergement peut traiter des journaux ordinaires de requêtes ; opérateur, prestataires et conservation restent à confirmer.",
      ],
      [
        "Vos informations",
        "N'envoyez pas de données sensibles. Identité du responsable, finalités, base légale, sous-traitants, conservation et traitement des droits doivent être vérifiés avant l'activation de services.",
      ],
    ],
  },
  terms: {
    title: "Conditions générales",
    heading: "Conditions générales",
    description:
      "Projet de structure. Les achats sont désactivés et les conditions commerciales ne sont pas approuvées.",
    sections: [
      [
        "Informations et aperçus",
        "Les aperçus de développement ne sont pas des offres de vente. Composition, origine, format, prix et disponibilité peuvent évoluer. Les images ne représentent pas des produits finaux.",
      ],
      [
        "Vérification commerciale nécessaire",
        "Opérateur, immatriculation, TVA, conditions consommateurs et professionnels, paiement, livraison, rétractation, réclamations et règles contractuelles doivent être fournis et vérifiés avant toute transaction.",
      ],
    ],
  },
  accessibility: {
    title: "Accessibilité",
    heading: "Une expérience plus accessible.",
    description:
      "Navigation clavier, contenu lisible et mise en page adaptative. Aucune certification WCAG formelle n'est revendiquée.",
    sections: [
      [
        "Notre approche",
        "Titres structurés, contrôles étiquetés, focus visible, lien d'évitement, alternatives d'images, navigation clavier et respect de la réduction des animations.",
      ],
      [
        "Un travail continu",
        "Les contrôles automatiques et manuels ne remplacent pas un audit indépendant. Un canal de retour et les déclarations légalement nécessaires restent à confirmer.",
      ],
    ],
  },
};

export const faqsFrench = [
  [
    "Puis-je acheter les produits JULA maintenant ?",
    "Pas encore. Le catalogue présente des aperçus de développement clairement identifiés, pas des produits disponibles à l'achat.",
  ],
  [
    "Les recettes et les coffrets sont-ils définitifs ?",
    "Non. Sélections, ingrédients, quantités, préparation et emballages nécessitent une validation. Les quantités des coffrets sont des propositions.",
  ],
  [
    "Où se trouve JULA ?",
    "Le projet est centré à Liège, en Belgique, son premier marché envisagé. Adresse juridique et immatriculation n'ont pas encore été fournies pour ce site.",
  ],
  [
    "JULA possède-t-elle les fermes ou les usines ?",
    "Aucune propriété n'est revendiquée. Les informations publiques sur les partenaires nécessiteront des preuves et leur autorisation.",
  ],
  [
    "Ces boissons conviennent-elles à mon allergie ?",
    "Ne vous fiez pas à ces aperçus pour décider. Ingrédients et contacts croisés restent à vérifier. Sésame-kinako comprend sésame et soja ; la recette à la pistache comprend un fruit à coque.",
  ],
  [
    "Les produits sont-ils certifiés bio ou Fairtrade ?",
    "Aucune certification n'est revendiquée. Toute certification et utilisation de marque doivent être étayées pour le produit concerné.",
  ],
  [
    "Mon entreprise peut-elle demander une personnalisation ?",
    "Le formulaire aide à préparer une demande. Fourniture, personnalisation, quantités, prix et délais dépendent de la faisabilité et d'une confirmation commerciale. Le service de réception n'est pas encore actif.",
  ],
  [
    "Dans quels pays livrerez-vous ?",
    "La Belgique est le premier marché envisagé. Pays, transporteurs, tarifs et délais ne sont pas confirmés.",
  ],
  [
    "Qu'est-ce que JULA Passport ?",
    "Un concept futur pour relier un produit à des informations vérifiées. L'aperçu actuel ne permet ni traçabilité de lots ni authentification.",
  ],
] as const;

export const frenchRoutePaths = [
  "",
  "shop",
  "discovery-boxes",
  ...Object.keys(pages).filter((page) => !["fr", "nl"].includes(page)),
  ...ranges.map((range) => `ranges/${range.id}`),
  ...publicProducts().map((product) => `products/${product.slug}`),
  ...boxes.map((box) => `discovery-boxes/${box.slug}`),
];
