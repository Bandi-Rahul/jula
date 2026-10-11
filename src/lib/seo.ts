import type { Metadata } from "next";
import { assetPath } from "./hosting";
import { languagePath, localeFromPath } from "./languages";

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
      ? {
          canonical: assetPath(path),
          languages: {
            en: assetPath(languagePath(path, "en")),
            ...(path === "/nl"
              ? {}
              : { fr: assetPath(languagePath(path, "fr")) }),
          },
        }
      : undefined,
    openGraph: {
      title: `${title} | JULA`,
      description,
      type: "website",
      locale: localeFromPath(path) === "fr" ? "fr_BE" : "en_GB",
      url: base ? assetPath(path) : undefined,
      images: base
        ? [
            {
              url: assetPath(image),
              alt:
                localeFromPath(path) === "fr"
                  ? "Photographie de contexte ou illustration de développement JULA"
                  : "Contextual beverage image or JULA development illustration",
            },
          ]
        : undefined,
    },
  };
}
