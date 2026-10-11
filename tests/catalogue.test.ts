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
