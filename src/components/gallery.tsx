"use client";

import Image from "next/image";
import { useRef } from "react";
import { Expand, X } from "lucide-react";
import { localisedMedia } from "@/lib/content";
import { translate, type Locale } from "@/lib/languages";
import type { MediaKey } from "@/lib/catalogue";

export function Gallery({
  name,
  locale = "en",
}: {
  name: MediaKey;
  locale?: Locale;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const asset = localisedMedia(name, locale);
  const t = (text: string) => translate(text, locale);
  return (
    <div className="product-gallery">
      <figure>
        <button
          className="gallery-image"
          onClick={() => dialog.current?.showModal()}
          aria-label={t("View full contextual image")}
        >
          <Image
            src={asset.src}
            alt={asset.alt}
            fill
            priority
            sizes="(max-width: 750px) 100vw, 50vw"
          />
          <span className="gallery-expand" title={t("View full image")}>
            <Expand size={19} />
          </span>
        </button>
        <figcaption>{asset.caption}</figcaption>
      </figure>
      <dialog
        ref={dialog}
        className="image-dialog"
        aria-label={t("Full contextual image")}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="image-dialog-content">
          <button
            className="icon-button"
            onClick={() => dialog.current?.close()}
            aria-label={t("Close full image")}
            title={t("Close full image")}
          >
            <X />
          </button>
          <div>
            <Image src={asset.src} alt={asset.alt} fill sizes="90vw" />
          </div>
          <p>{asset.caption}</p>
        </div>
      </dialog>
    </div>
  );
}
