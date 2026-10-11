"use client";

import Link from "next/link";
import { RotateCcw } from "lucide-react";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="unavailable-service wrap">
      <div>
        <span className="eyebrow">Something went wrong</span>
        <h1>A pause, not the end.</h1>
        <p>
          This page could not be displayed. Try again or return to the
          collection.
        </p>
        <button className="button" onClick={reset}>
          <RotateCcw size={16} />
          Try again
        </button>
        <Link href="/shop" className="text-link">
          Explore the collection
        </Link>
      </div>
    </section>
  );
}
