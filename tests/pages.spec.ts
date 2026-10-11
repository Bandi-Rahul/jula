import { expect, test } from "@playwright/test";
import { ranges, publicProducts, boxes } from "../src/lib/catalogue";
import { pages } from "../src/lib/pages";

test.skip(
  process.env.TEST_STATIC !== "true",
  "Requires the GitHub Pages static preview",
);

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
