import type { Metadata } from "next";
import { assetPath } from "./hosting";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image = "/images/tea-ritual.webp",
): Metadata {
  const base = process.env.SITE_URL;
  return {
    title,
    description,
    alternates: base
      ? { canonical: assetPath(path), languages: { en: assetPath(path) } }
      : undefined,
    openGraph: {
      title: `${title} | JULA`,
      description,
      type: "website",
      locale: "en_GB",
      url: base ? assetPath(path) : undefined,
      images: base
        ? [
            {
              url: assetPath(image),
              alt: "Contextual beverage image or JULA development illustration",
            },
          ]
        : undefined,
    },
  };
}
