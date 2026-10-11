import { expect, test } from "@playwright/test";
import { ranges, publicProducts, boxes } from "../src/lib/catalogue";
import { pages } from "../src/lib/pages";
import { frenchRoutePaths } from "../src/lib/french";

test.skip(
  process.env.TEST_STATIC !== "true",
  "Requires the GitHub Pages static preview",
);

test("French Pages preserve language, equivalent links, filters and image layout", async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/jula/fr/");
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await expect(page.locator(".hero h1")).toContainText(
    "Une tasse à laquelle on revient.",
  );
  await expect(page.locator(".wordmark").first()).toContainText(
    "Une maison de boissons",
  );
  await page.evaluate(async () => {
    for (const image of Array.from(document.images)) {
      image.loading = "eager";
      await image.decode().catch(() => undefined);
    }
  });
  expect(
    await page
      .locator("main img")
      .evaluateAll((images) =>
        images.every((image) => (image as HTMLImageElement).naturalWidth > 0),
      ),
  ).toBe(true);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: `.build/ai/website/french-${info.project.name}.png`,
  });
  await page.getByRole("link", { name: "Explorer JULA", exact: true }).click();
  await page.getByLabel("Trouver une boisson").fill("jasmin");
  await page.getByLabel("Famille", { exact: true }).selectOption("tea");
  await page.getByLabel("Orientation gustative").selectOption("Floral");
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.reload();
  await expect(page.getByLabel("Trouver une boisson")).toHaveValue("jasmin");
  await page.locator(".language-picker summary").click();
  await page
    .locator(".language-panel")
    .getByRole("link", { name: /English/ })
    .click();
  await expect(page).toHaveURL(
    /\/jula\/shop\/\?q=jasmin&family=tea&taste=Floral/,
  );
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByLabel("Find a drink")).toHaveValue("jasmin");
  await page.locator(".language-picker summary").click();
  await page
    .locator(".language-panel")
    .getByRole("link", { name: /Français/ })
    .click();
  await expect(page).toHaveURL(
    /\/jula\/fr\/shop\/\?q=jasmin&family=tea&taste=Floral/,
  );
  await page
    .getByRole("link", { name: "Découvrir Thé au jasmin", exact: true })
    .click();
  await expect(page.locator("h1")).toHaveText("Thé au jasmin");
  await expect(
    page.getByRole("button", { name: "Pas encore disponible à l'achat" }),
  ).toBeDisabled();
  await page
    .getByRole("button", { name: "Agrandir l'image de contexte" })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test("French Pages forms and utility controls remain honest and functional", async ({
  page,
}) => {
  const submitted: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST") submitted.push(request.url());
  });
  await page.goto("/jula/fr/contact/");
  await page.getByLabel("Votre nom").fill("Une visiteuse");
  await page.locator("#enquiry-email").fill("visiteur@example.com");
  await page
    .getByLabel("Votre message")
    .fill("Je souhaite découvrir votre projet autour des thés au jasmin.");
  await page.locator('input[name="privacy"]').check();
  await page.getByRole("button", { name: "Vérifier la demande" }).click();
  await expect(page.getByRole("status")).toContainText("Rien n'a été envoyé");
  await expect(page.getByRole("status")).toContainText("dans ce navigateur");
  await page.goto("/jula/fr/");
  await page.locator("#newsletter-email").fill("visiteur@example.com");
  await page.locator('input[name="consent"]').check();
  await page
    .getByRole("button", { name: "Demander l'inscription aux nouvelles JULA" })
    .click();
  await expect(page.getByRole("status")).toContainText(
    "Aucun abonnement n'a été créé",
  );
  expect(submitted).toEqual([]);
  await page.goto("/jula/fr/faq/");
  await page.getByLabel("Rechercher une question").fill("allergie");
  await expect(page.locator(".accordion-list details")).toHaveCount(1);
  await page.locator(".accordion-list summary").click();
  await expect(page.locator(".accordion-list")).toContainText("sésame et soja");
  await page.goto("/jula/fr/preparation/");
  await page.getByLabel("Choisir une famille").selectOption("latte");
  await expect(page.locator(".guide-result")).toContainText(
    "Sans lait ne signifie pas sans allergènes",
  );
  await page.goto("/jula/fr/cookies/");
  await page
    .getByRole("button", { name: "Enregistrer les préférences" })
    .click();
  await expect(page.getByRole("status")).toContainText(
    "Préférences enregistrées",
  );
  await page
    .getByRole("button", { name: "Supprimer la préférence enregistrée" })
    .click();
  await expect(page.getByRole("status")).toContainText("a été supprimée");
});

test("French Pages are exported with French HTML and equivalent-language metadata", async ({
  request,
}, info) => {
  test.skip(info.project.name !== "desktop");
  for (const route of frenchRoutePaths) {
    const response = await request.get(`/jula/fr/${route ? `${route}/` : ""}`);
    expect(response.status(), route).toBe(200);
    const html = await response.text();
    expect(html, route).toContain('<html lang="fr"');
    expect(html, route).toContain('hrefLang="fr"');
    expect(html, route).toContain("<h1");
  }
  expect(
    (await request.get("/jula/fr/products/internal-concept/")).status(),
  ).toBe(404);
});

test("Pages base path preserves navigation, images and catalogue queries", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/jula/");
  await expect(page.locator(".hero h1")).toContainText("JULA");
  await page.evaluate(async () => {
    for (const image of Array.from(document.images)) {
      image.loading = "eager";
      await image.decode().catch(() => undefined);
    }
  });
  expect(
    await page
      .locator("main img")
      .evaluateAll((images) =>
        images.every((image) => (image as HTMLImageElement).naturalWidth > 0),
      ),
  ).toBe(true);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("link", { name: "Explore JULA", exact: true }).click();
  await expect(page).toHaveURL(/\/jula\/shop\/$/);
  await page.getByLabel("Find a drink").fill("jasmine");
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.reload();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.getByLabel("Family", { exact: true }).selectOption("tea");
  await page
    .getByRole("link", { name: "Explore Jasmine tea", exact: true })
    .click();
  await expect(page).toHaveURL(/\/jula\/products\/jasmine-tea\/$/);
  await expect(
    page.getByRole("button", { name: "Not yet available to purchase" }),
  ).toBeDisabled();
  await page
    .getByRole("button", { name: "View full contextual image" })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  expect(errors).toEqual([]);
});

test("Pages enquiries validate in-browser without network submission", async ({
  page,
}) => {
  const submitted: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST") submitted.push(request.url());
  });
  await page.goto("/jula/contact/");
  await page.getByLabel("Your name").fill("A visitor");
  await page.locator("#enquiry-email").fill("visitor@example.com");
  await page
    .getByLabel("Your message")
    .fill("I would like to ask about your tea development programme.");
  await page.locator('input[name="privacy"]').check();
  await page.getByRole("button", { name: "Check enquiry" }).click();
  await expect(page.getByRole("status")).toContainText("Nothing was sent");
  await expect(page.getByRole("status")).toContainText("in this browser");
  await page.goto("/jula/");
  await page.locator("#newsletter-email").fill("visitor@example.com");
  await page.locator('input[name="consent"]').check();
  await page.getByRole("button", { name: "Request newsletter signup" }).click();
  await expect(page.getByRole("status")).toContainText(
    "No subscription was created",
  );
  expect(submitted).toEqual([]);
});

test("Pages public routes are served under the repository path", async ({
  request,
}, info) => {
  test.skip(info.project.name !== "desktop");
  const routes = [
    "",
    "shop",
    "discovery-boxes",
    ...Object.keys(pages),
    ...ranges.map((range) => `ranges/${range.id}`),
    ...publicProducts().map((product) => `products/${product.slug}`),
    ...boxes.map((box) => `discovery-boxes/${box.slug}`),
  ];
  for (const route of routes) {
    const response = await request.get(`/jula/${route ? `${route}/` : ""}`);
    expect(response.status(), route).toBe(200);
    expect(await response.text()).toContain("<h1");
  }
  expect((await request.get("/jula/api/enquiries/")).status()).toBe(404);
  expect((await request.get("/jula/products/internal-concept/")).status()).toBe(
    404,
  );
});
