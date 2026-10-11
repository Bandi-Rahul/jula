import type { MetadataRoute } from "next";
import { ranges, publicProducts, boxes } from "@/lib/catalogue";
import { assetPath } from "@/lib/hosting";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.SITE_URL;
  if (!base || process.env.ALLOW_INDEXING !== "true") return [];
  const paths = [
    "/",
    "/shop",
    "/discovery-boxes",
    "/our-story",
    "/origins",
    "/preparation",
    "/commitments",
    "/professionals",
    "/contact",
    "/faq",
    "/passport",
    ...ranges.map((range) => `/ranges/${range.id}`),
    ...publicProducts().map((product) => `/products/${product.slug}`),
    ...boxes.map((box) => `/discovery-boxes/${box.slug}`),
  ];
  return paths.map((path) => ({
    url: new URL(assetPath(path), base).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.6,
  }));
}
