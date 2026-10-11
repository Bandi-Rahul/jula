import { FrenchPage, frenchPageInfo } from "@/components/french-pages";
import { frenchRoutePaths } from "@/lib/french";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return frenchRoutePaths
    .filter(Boolean)
    .map((path) => ({ slug: path.split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const path = (await params).slug.join("/");
  const info = frenchPageInfo(path);
  if (!info) return {};
  const metadata = pageMetadata(info.title, info.description, `/fr/${path}`);
  if (
    ["shipping", "returns", "terms", "privacy", "account", "bag"].includes(path)
  )
    metadata.robots = { index: false, follow: true };
  return metadata;
}

export default async function FrenchRoute({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  return <FrenchPage path={(await params).slug.join("/")} />;
}
