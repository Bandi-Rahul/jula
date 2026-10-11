import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const groups = [
  {
    title: "Discover",
    links: [
      ["The collection", "/shop"],
      ["Discovery boxes", "/discovery-boxes"],
      ["Prepare JULA", "/preparation"],
      ["Passport preview", "/passport"],
    ],
  },
  {
    title: "The house",
    links: [
      ["Our story", "/our-story"],
      ["Origins & producers", "/origins"],
      ["Our commitments", "/commitments"],
      ["For professionals", "/professionals"],
    ],
  },
  {
    title: "Here to help",
    links: [
      ["Contact", "/contact"],
      ["Questions & answers", "/faq"],
      ["Shipping & delivery", "/shipping"],
      ["Returns & refunds", "/returns"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top wrap">
        <div className="footer-brand">
          <Link href="/" className="wordmark">
            JULA
          </Link>
          <p>
            A little curiosity.
            <br />A cup worth returning to.
          </p>
          <span>Liège, Belgium · Pre-launch</span>
        </div>
        {groups.map((group) => (
          <div className="footer-group" key={group.title}>
            <h2>{group.title}</h2>
            {group.links.map(([label, href]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="footer-bottom wrap">
        <span>© {new Date().getFullYear()} JULA</span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/cookies">Cookie preferences</Link>
          <Link href="/accessibility">Accessibility</Link>
        </div>
        <Link href="/">
          English <ArrowUpRight size={13} />
        </Link>
      </div>
      <p className="footer-disclaimer wrap">
        Development previews are not offers for sale. Legal business details and
        commercial policies await review.
      </p>
    </footer>
  );
}
