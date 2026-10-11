import type { MetadataRoute } from "next";
import { assetPath } from "@/lib/hosting";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const enabled =
    process.env.ALLOW_INDEXING === "true" && Boolean(process.env.SITE_URL);
  return {
    rules: {
      userAgent: "*",
      ...(enabled
        ? {
            allow: "/",
            disallow: [
              "/api/",
              "/account",
              "/bag",
              "/fr",
              "/nl",
              "/terms",
              "/privacy",
              "/shipping",
              "/returns",
            ],
          }
        : { disallow: "/" }),
    },
    sitemap: enabled
      ? new URL(assetPath("/sitemap.xml"), process.env.SITE_URL).toString()
      : undefined,
  };
}
