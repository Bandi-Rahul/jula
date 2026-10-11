import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
import { publicProducts, ranges, boxes } from "../src/lib/catalogue";
import { pages } from "../src/lib/pages";

test.skip(
  process.env.TEST_STATIC === "true",
  "Node-hosted checks run separately from the static Pages edition",
);

test("responsive customer pages render their images without overflow", async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await mkdir(".build/ai/website/qa", { recursive: true });
  for (const path of [
    "/",
    "/shop",
    "/products/jasmine-tea",
    "/our-story",
    "/professionals",
    "/contact",
    "/passport",
  ]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main h1")).toBeVisible();
    await page.evaluate(async () => {
      await document.fonts.ready;
      for (const image of Array.from(document.images)) {
        image.loading = "eager";
        await image.decode().catch(() => undefined);
      }
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      path,
    ).toBe(true);
    expect(
      await page
        .locator("main img")
        .evaluateAll((images) =>
          images.every((image) => (image as HTMLImageElement).naturalWidth > 0),
        ),
      path,
    ).toBe(true);
    if (path === "/") {
      expect(
        await page
          .locator(".home-introduction .eyebrow")
          .evaluate(
            (element) => element.getBoundingClientRect().top < innerHeight,
          ),
      ).toBe(true);
    }
    await page.screenshot({
      path: `.build/ai/website/qa/${info.project.name}-${path === "/" ? "home" : path.slice(1).replaceAll("/", "-")}.png`,
      fullPage: true,
    });
  }
  expect(errors).toEqual([]);
});

test("catalogue search, filters, empty state and shareable URLs work", async ({
  page,
}) => {
  await page.goto("/shop");
  await expect(page.locator(".product-card")).toHaveCount(14);
  await page.getByLabel("Find a drink").fill("jasmine");
  await expect(page.locator(".product-card")).toHaveCount(1);
  await expect(page).toHaveURL(/q=jasmine/);
  await page.getByLabel("Family", { exact: true }).selectOption("tea");
  await page.getByLabel("Taste direction").selectOption("Floral");
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.getByLabel("Find a drink").fill("no such beverage");
  await expect(
    page.getByRole("heading", { name: "No matching previews." }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Reset filters", exact: true })
    .first()
    .click();
  await expect(page.locator(".product-card")).toHaveCount(14);
  await page.getByLabel("Family", { exact: true }).selectOption("roasted");
  await expect(page.locator(".product-card")).toHaveCount(0);
  await page.goto("/shop?q=jasmine");
  await expect(page.locator(".product-card")).toHaveCount(1);
});

test("product gallery is keyboard-operable and purchase remains disabled", async ({
  page,
}) => {
  await page.goto("/products/jasmine-tea");
  await expect(
    page.getByRole("button", { name: "Not yet available to purchase" }),
  ).toBeDisabled();
  await page
    .getByRole("button", { name: "View full contextual image" })
    .click();
  await expect(
    page.getByRole("dialog", { name: "Full contextual image" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "View full contextual image" }),
  ).toBeFocused();
});

test("enquiry and newsletter validate without false delivery claims", async ({
  page,
}) => {
  await page.goto("/contact");
  await page.getByLabel("Your name").fill("A test visitor");
  await page.locator("#enquiry-email").fill("visitor@example.com");
  await page
    .getByLabel("Your message")
    .fill("I would like to ask about your tea development programme.");
  await page.locator('input[name="privacy"]').check();
  await page.getByRole("button", { name: "Check enquiry" }).click();
  await expect(page.getByRole("status")).toContainText("Nothing was sent");
  await expect(page.getByLabel("Your message")).not.toBeEmpty();
  await page.goto("/");
  await page.locator("#newsletter-email").fill("visitor@example.com");
  await page.locator('input[name="consent"]').check();
  await page.getByRole("button", { name: "Request newsletter signup" }).click();
  await expect(page.getByRole("status")).toContainText(
    "No subscription was created",
  );
});

test("guides, FAQs, Passport and browser-local preferences work", async ({
  page,
}) => {
  await page.goto("/preparation");
  await page.getByLabel("Choose a family").selectOption("coffee");
  await expect(
    page.getByRole("heading", { name: "The format follows the equipment." }),
  ).toBeVisible();
  await page.goto("/faq");
  await page.locator("#faq-search").fill("organic");
  await expect(page.locator(".faq-content details")).toHaveCount(1);
  await page.locator(".faq-content summary").click();
  await expect(page.locator(".faq-content details")).toContainText(
    "No certification claim",
  );
  await page.goto("/passport");
  await page
    .getByLabel("Explore a public development reference")
    .selectOption("indian-arabica");
  await expect(page.locator(".passport-record h2")).toHaveText(
    "Indian Arabica",
  );
  await expect(page.locator(".passport-record")).toContainText("Not available");
  await page.goto("/cookies");
  await page.getByRole("button", { name: "Save preferences" }).click();
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("jula-privacy-preferences-v1") ?? "{}")
          .analytics,
    ),
  ).toBe(false);
  await page.reload();
  await expect(page.getByRole("status")).toContainText(
    "stored in this browser",
  );
  await page.getByRole("button", { name: "Remove saved preference" }).click();
  expect(
    await page.evaluate(() =>
      localStorage.getItem("jula-privacy-preferences-v1"),
    ),
  ).toBeNull();
});

test("mobile navigation opens, closes with Escape and navigates", async ({
  page,
}) => {
  test.skip((page.viewportSize()?.width ?? 1280) > 850);
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Discovery boxes", exact: true })
    .click();
  await expect(page).toHaveURL(/discovery-boxes/);
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).not.toBeVisible();
});

test("key pages pass automated accessibility checks", async ({
  page,
}, info) => {
  test.skip(info.project.name !== "desktop");
  for (const path of [
    "/",
    "/shop",
    "/products/jasmine-tea",
    "/professionals",
    "/contact",
    "/cookies",
  ]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .exclude("nextjs-portal")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations,
      `${path}: ${results.violations.map((issue) => issue.id).join(", ")}`,
    ).toEqual([]);
  }
});

test("every public route resolves and unknown references return 404", async ({
  page,
  request,
}, info) => {
  test.skip(info.project.name !== "desktop");
  const paths = [
    "/",
    "/shop",
    "/discovery-boxes",
    ...Object.keys(pages).map((id) => `/${id}`),
    ...ranges.map((range) => `/ranges/${range.id}`),
    ...publicProducts().map((product) => `/products/${product.slug}`),
    ...boxes.map((box) => `/discovery-boxes/${box.slug}`),
  ];
  for (const path of paths) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    expect(await response.text(), path).toContain("<h1");
  }
  expect(
    (await request.get("/products/private-internal-concept")).status(),
  ).toBe(404);
  expect((await request.get("/not-a-page")).status()).toBe(404);
  await page.goto("/en/shop");
  await expect(page).toHaveURL(/\/shop$/);
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Disallow: /",
  );
  const invalid = await request.post("/api/enquiries", {
    headers: { Origin: "http://localhost:3000" },
    data: { kind: "newsletter", email: "invalid", consent: true },
  });
  expect(invalid.status()).toBe(400);
  const crossOrigin = await request.post("/api/enquiries", {
    headers: { Origin: "https://other.example" },
    data: { kind: "newsletter", email: "person@example.com", consent: true },
  });
  expect(crossOrigin.status()).toBe(403);
});
