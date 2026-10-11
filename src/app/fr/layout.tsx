import {
  SiteLayout,
  metadata as sharedMetadata,
} from "@/components/site-layout";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...sharedMetadata,
  ...pageMetadata(
    "Une maison de boissons en devenir",
    "JULA, une maison de boissons en développement à Liège, en Belgique.",
    "/fr",
  ),
  title: {
    default: "JULA | Une maison de boissons en devenir",
    template: "%s | JULA",
  },
};

export default function FrenchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteLayout locale="fr">{children}</SiteLayout>;
}
