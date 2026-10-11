# JULA design and implementation direction

## Rationale

An editorial beverage house, not a wellness marketplace. A photographic first viewport introduces JULA; airy white and cream content, forest-green anchors, and small antique-gold rules connect the screen to the supplied packaging. Cormorant Garamond and DM Sans balance cultural storytelling with readable commerce information. Existing packaging illustrations are labelled development artwork, never final product photography or evidence of origin.

## Sitemap

Home / Shop / Ranges (seven family pages) / Product concepts / Discovery boxes / Our story / Origins / Preparation / Commitments / Professionals / Contact / FAQ / Passport preview / Account (unavailable) / Bag (commerce unavailable) / Shipping / Returns / Privacy / Terms / Accessibility / Cookie preferences.

Main navigation: Explore, Discovery boxes, Our story, Professionals. Utility navigation: search, English language availability, account availability, bag availability. Footer contains deeper editorial and support links.

## Architecture

Next.js App Router, React, strict TypeScript, scoped reusable CSS classes and global design tokens. Server-rendered editorial and detail routes. Small client components for filtering, mobile navigation and forms. Typed central content is the sole source for range/product identity, pending details and approval status. Only explicit public-preview records appear; internal concepts and discontinued records never render in public catalogues. No product is purchase-enabled without approved status, confirmed stock and configured commerce.

## Components and tokens

Header/mobile navigation, Footer, Media, PageIntro, ProductCard, RangeIndex, Catalog, PendingDetails, InquiryForm, Newsletter, CookiePreferences, status labels and shared link/buttons. Colours: #183D32, #F6F1E7, #87977A, #B59A62, #282B27, #FFFFFF. Body text uses charcoal; light green and gold are non-text accents. Radius 4px for fields; editorial sections remain unframed.

## Content governance

English first, with canonical unprefixed URLs and /en aliases. /fr and /nl explain translation availability; they are not translated editions. French/Dutch require reviewed complete dictionaries and food information before activation. Site copy is proposed for business review. Ingredient/formula details are not copied from conflicting research sheets. Product illustrations and contextual photographs are identified appropriately. No prices, reviews, supplier relationships or fulfilment promises are invented.

## External integrations

Approved enquiry/newsletter endpoint, email service, spam protection, consent records, secure commerce checkout, inventory/order/batch management, tax and carrier settings, transactional email, supported authentication, reviewed CMS workflow and verified legal/company data. All remain disabled unless configured. No analytics or non-essential cookies are installed.

## Phases and gates

1. Establish structure and content model; install dependencies.
2. Build visual foundation and homepage; production build.
3. Add catalogue, ranges, product and box routes; gating/filter tests.
4. Add editorial, professional and support experiences; server form validation tests.
5. Browser QA at 360, 768, 1280 and wide desktop; keyboard/forms/routes checks.
6. Lint, typecheck, tests, production build and handover documentation.
