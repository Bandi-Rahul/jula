import { SiteLayout } from "@/components/site-layout";
export { metadata } from "@/components/site-layout";

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteLayout locale="en">{children}</SiteLayout>;
}
