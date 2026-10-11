import Image from "next/image";
import { media } from "@/lib/content";
import type { MediaKey } from "@/lib/catalogue";

export function Media({
  name,
  className = "",
  priority = false,
  caption = true,
  sizes = "(max-width: 700px) 100vw, 50vw",
}: {
  name: MediaKey;
  className?: string;
  priority?: boolean;
  caption?: boolean;
  sizes?: string;
}) {
  const asset = media[name];
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
