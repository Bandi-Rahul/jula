# JULA

A working pre-launch brand website built from the supplied JULA documents. Original PDFs and JPEGs remain untouched. Product and box pages are explicitly development previews, not offers for sale.

## Run locally

Requires Node.js 22+ and npm.

```powershell
npm ci
npm run dev -- --port 3000
```

Open http://localhost:3000. For a production build, run `npm run build`, then `npm start -- --port 3001`. A Node-capable Next.js host is required because catalogue query parameters and enquiries use server routes; this is not a static export.

## Structure

## GitHub Pages

Repository: https://github.com/Bandi-Rahul/jula. Pages address: https://bandi-rahul.github.io/jula/. Pushes to `main` trigger the Pages workflow, which builds a separate static export with a `/jula` base path. Enable Pages with GitHub Actions as its source.

Run `npm run build:pages`, then `npm run preview:pages` for a preview at http://localhost:3002/jula/. Artifacts are retained under `.build/ai/github-pages/` and are not committed. Original business PDFs/JPEGs, research artifacts, dependencies and local secrets are excluded from Git.

GitHub Pages cannot run the Node enquiry API, server headers, redirects, image optimisation or authentication. The static edition uses pre-optimised images, browser-side search and local-only form validation. No enquiry fields or newsletter signup are transmitted. `/en` aliases apply only to the Node edition. Indexing and nonessential services remain disabled. Connecting real email or commerce requires an approved external backend or Node-capable host.

To test the static preview, set `TEST_STATIC=true` and `TEST_BASE_URL=http://localhost:3002`, then run `npm run test:e2e -- --grep Pages`. The original Node-hosted build remains available with `npm run build` and `npm start`.

## Source Structure

- `src/lib/catalogue.ts`: seven families, fourteen public previews, four proposed discovery assortments, publication and purchase gates.
- `src/lib/content.ts`, `src/lib/pages.ts`: central editorial, FAQ, media, policy and page content.
- `src/components`: reusable layout, imagery, catalogue, gallery, forms and service experiences.
- `src/app/(english)`: unprefixed English pages and their root layout.
- `src/app/fr`: statically generated French pages with a French root layout; shared data and controls live in `src/lib` and `src/components`.
- `src/app`: metadata routes and the enquiry API.
- `src/styles/pages.css`, `src/app/globals.css`: responsive layouts and design tokens.
- `docs/DESIGN.md`: design rationale, sitemap and architecture.
- `docs/PRELAUNCH.md`: required publication and production approvals.
- `docs/ASSETS.md`: image sources and limitations.

English uses unprefixed URLs; French uses `/fr` and equivalent paths such as `/fr/shop` and `/fr/products/jasmine-tea`. The header language switcher preserves the current page and catalogue query filters. Each edition has its own server-rendered document language, metadata and shared product publication gates. French covers navigation, editorial pages, products, discovery boxes, forms, preparation, FAQs, Passport and legal drafts. Translation copy still needs business/native-speaker review before commercial launch. Dutch remains unavailable at `/nl`. `/en` aliases are redirects in the Node edition only.

## Working interactions

Catalogue search, family/taste filters, sorting, reset, empty states and shareable query URLs; keyboard-operable image zoom; mobile navigation; searchable FAQ; preparation family selector; enquiry validation and draft copying; newsletter opt-in validation; browser-local privacy preferences; and the labelled Passport preview.

Accounts, checkout, inventory, payments and live batch provenance are deliberately absent. No fake transaction, account, subscription or delivery confirmation is generated.

## Forms and integrations

Use `.env.example` as the configuration reference. Secrets belong only in the host's server environment or an ignored local environment file. Do not put them in `NEXT_PUBLIC_*` variables.

By default, form checks transmit fields to this site's server for bounded schema validation but do not persist them or forward them to another service. A 503 response explicitly says that nothing was sent and no subscription was created. Drafts remain in the browser form.

Activation requires both `FORM_PROCESSING_APPROVED=true` and the appropriate HTTPS webhook URL. Optional bearer tokens stay on the server. Redirects are rejected, requests time out after eight seconds, and success requires a 2xx response with JSON matching:

```json
{ "accepted": true, "id": "receiving-service-request-id" }
```

The UI reports receiving-service acceptance, not confirmed email delivery. The provider must implement storage, opt-in evidence, double opt-in if applicable, deduplication, delivery, retention, unsubscribe and rights handling. Review privacy and service text before activation. When changing integration environment settings, rebuild because editorial form status is prerendered.

The API enforces same-origin JSON requests, a 16 KiB body bound, strict schemas, a honeypot and an in-memory request limit. Without a trusted client-IP header it uses a shared per-process limit. Set `TRUSTED_CLIENT_IP_HEADER` only when the edge proxy overwrites that header. Production needs shared edge/distributed rate limiting and abuse controls; the in-memory limit is not sufficient for multi-instance hosting. Do not log request bodies or secrets.

## SEO and deployment

Set `SITE_URL` to the approved absolute public HTTPS origin. Canonical and social-image URLs are emitted only with a configured domain. Indexing defaults off, robots disallows crawling, and sitemap is empty until both a domain and `ALLOW_INDEXING=true` are supplied. Draft legal and unavailable language/account pages remain noindex. This is not access control: use hosting authentication for private review environments.

Headers disable framing and unnecessary browser permissions and add nosniff and a strict referrer policy. Configure HTTPS/HSTS, hosting logs, an appropriate tested CSP, backups and dependency monitoring at deployment. No analytics or advertising trackers are installed. Optional preferences are stored only when explicitly saved.

## Verification

```powershell
npm test
npm run typecheck
npm run lint
npm run build
node --use-system-ca node_modules/@playwright/test/cli.js install chromium
npm run test:e2e
```

Browser tests require an already-running server at http://localhost:3000; use `TEST_BASE_URL` for another server. They cover widths 360, 768, 1280 and 1920, public routes, images, overflow, filters, gallery focus, forms, guides, preferences and key-page automated accessibility checks. Screenshots/traces are written under `.build/ai/website/`. Automated accessibility checks are not a certification or a complete manual audit.

Use `npm run format` and `npm run format:check` for consistent source formatting. Content approval, actual product photographs, legal review and external integrations remain launch prerequisites, not completed work.
