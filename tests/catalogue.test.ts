import assert from "node:assert/strict";
import test from "node:test";
import {
  canPurchase,
  filterProducts,
  isPublicProduct,
  products,
  publicProducts,
  ranges,
} from "../src/lib/catalogue";
import {
  boxCopyFrench,
  frenchPages,
  frenchProducts,
  productCopyFrench,
  rangesFrench,
} from "../src/lib/french";
import { boxes } from "../src/lib/catalogue";
import { pages } from "../src/lib/pages";
import { languagePath, localeFromPath } from "../src/lib/languages";

test("French content covers every public record without changing purchase gates", () => {
  for (const product of publicProducts())
    assert.ok(productCopyFrench[product.slug]);
  for (const range of ranges) assert.ok(rangesFrench[range.id]);
  for (const box of boxes) assert.ok(boxCopyFrench[box.slug]);
  for (const page of Object.keys(pages).filter(
    (id) => !["fr", "nl"].includes(id),
  ))
    assert.ok(frenchPages[page], page);
  assert.deepEqual(
    frenchProducts().map((product) => product.slug),
    publicProducts().map((product) => product.slug),
  );
  for (const product of frenchProducts()) {
    const original = publicProducts().find((item) => item.id === product.id)!;
    assert.equal(product.status, original.status);
    assert.equal(product.price, original.price);
    assert.equal(product.publicationApproved, original.publicationApproved);
    assert.equal(canPurchase(product, true), canPurchase(original, true));
  }
  assert.equal(
    filterProducts(frenchProducts(), "jasmin", "tea", "Floral", "name", "fr")[0]
      .slug,
    "jasmine-tea",
  );
  assert.ok(
    frenchProducts()
      .find((product) => product.slug === "black-sesame-kinako")!
      .allergenReview.includes("SOJA"),
  );
});

test("language links keep equivalent routes without doubling the Pages base path", () => {
  const previous = process.env.NEXT_PUBLIC_BASE_PATH;
  try {
    process.env.NEXT_PUBLIC_BASE_PATH = "/jula";
    assert.equal(localeFromPath("/jula/fr/products/jasmine-tea/"), "fr");
    assert.equal(localeFromPath("/jula/fragrance"), "en");
    assert.equal(
      languagePath("/jula/products/jasmine-tea/", "fr"),
      "/fr/products/jasmine-tea/",
    );
    assert.equal(
      languagePath("/jula/fr/products/jasmine-tea/", "en"),
      "/products/jasmine-tea/",
    );
    assert.equal(languagePath("/jula/", "fr"), "/fr");
  } finally {
    if (previous === undefined) delete process.env.NEXT_PUBLIC_BASE_PATH;
    else process.env.NEXT_PUBLIC_BASE_PATH = previous;
  }
});

test("internal concepts and discontinued products never become public", () => {
  assert.equal(
    isPublicProduct({ ...products[0], status: "concept", publicPreview: true }),
    false,
  );
  assert.equal(
    isPublicProduct({ ...products[0], status: "discontinued" }),
    false,
  );
  assert.equal(
    isPublicProduct({ ...products[0], publicPreview: false }),
    false,
  );
  assert.equal(
    isPublicProduct({
      ...products[0],
      status: "approved",
      publicationApproved: false,
    }),
    false,
  );
});

test("pre-launch records cannot be purchased even if commerce is configured", () => {
  for (const product of products) {
    assert.equal(canPurchase(product), false);
    assert.equal(canPurchase(product, true), false);
    assert.equal(product.price, null);
  }
});

test("purchase requires stock, price, approval and declarations", () => {
  const saleProduct = {
    ...products[0],
    status: "available" as const,
    publicationApproved: true,
    price: 20,
    stock: 2,
    ingredients: ["Tea"],
    allergens: [],
    packaging: "Approved pack",
  };
  assert.equal(canPurchase(saleProduct, true), true);
  assert.equal(canPurchase({ ...saleProduct, stock: 0 }, true), false);
  assert.equal(canPurchase({ ...saleProduct, allergens: null }, true), false);
  assert.equal(canPurchase(saleProduct, false), false);
});

test("search, family, taste and sorting use the same public catalogue", () => {
  assert.equal(
    filterProducts(products, "  jasmine ", "all", "all", "editorial")[0].slug,
    "jasmine-tea",
  );
  assert.ok(
    filterProducts(products, "", "tea", "Floral", "name").every(
      (product) => product.range === "tea" && product.tastes.includes("Floral"),
    ),
  );
  assert.equal(
    filterProducts(products, "no matching beverage", "all", "all", "name")
      .length,
    0,
  );
  assert.equal(ranges.length, 7);
  assert.equal(
    publicProducts().filter((product) => product.range === "roasted").length,
    0,
  );
});
