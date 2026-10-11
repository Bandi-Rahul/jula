import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="unavailable-service wrap">
      <div>
        <span className="eyebrow">404 · Page not found</span>
        <h1>This cup isn't on the table.</h1>
        <p>
          The page may not exist or the development reference may not be public.
          Explore the published collection instead.
        </p>
        <Link href="/shop" className="button">
          Explore JULA
          <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}
