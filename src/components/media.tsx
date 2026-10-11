import Image from "next/image";
import { localisedMedia } from "@/lib/content";
import type { MediaKey } from "@/lib/catalogue";
import type { Locale } from "@/lib/languages";

export function Media({
  name,
  locale = "en",
  className = "",
  priority = false,
  caption = true,
  sizes = "(max-width: 700px) 100vw, 50vw",
}: {
  name: MediaKey;
  locale?: Locale;
  className?: string;
  priority?: boolean;
  caption?: boolean;
  sizes?: string;
}) {
  const asset = localisedMedia(name, locale);
  return (
    <figure className={`media ${className}`}>
      <div className="media-image">
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          sizes={sizes}
          priority={priority}
        />
      </div>
      {caption && <figcaption>{asset.caption}</figcaption>}
    </figure>
  );
}
