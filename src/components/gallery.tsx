"use client";

import Image from "next/image";
import { useRef } from "react";
import { Expand, X } from "lucide-react";
import { media } from "@/lib/content";
import type { MediaKey } from "@/lib/catalogue";

export function Gallery({ name }: { name: MediaKey }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const asset = media[name];
  return (
    <div className="product-gallery">
      <figure>
        <button
          className="gallery-image"
          onClick={() => dialog.current?.showModal()}
          aria-label="View full contextual image"
        >
          <Image
            src={asset.src}
            alt={asset.alt}
            fill
            priority
            sizes="(max-width: 750px) 100vw, 50vw"
          />
          <span className="gallery-expand" title="View full image">
            <Expand size={19} />
          </span>
        </button>
        <figcaption>{asset.caption}</figcaption>
      </figure>
      <dialog
        ref={dialog}
        className="image-dialog"
        aria-label="Full contextual image"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="image-dialog-content">
          <button
            className="icon-button"
            onClick={() => dialog.current?.close()}
            aria-label="Close full image"
            title="Close full image"
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
