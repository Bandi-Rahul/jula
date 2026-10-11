import { notFound } from "next/navigation";
import { PageIntro } from "@/components/editorial";
import { PageBody } from "@/components/page-bodies";
import { pageById, pages, type PageId } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return Object.keys(pages).map((page) => ({ page }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const record = pageById(page);
  const metadata = record
    ? pageMetadata(record.title, record.description, `/${page}`)
    : {};
  if (
    [
      "shipping",
      "returns",
      "terms",
      "privacy",
      "account",
      "bag",
      "fr",
      "nl",
    ].includes(page)
  )
    metadata.robots = { index: false, follow: true };
  return metadata;
}
export default async function EditorialPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const record = pageById(page);
  if (!record) notFound();
  return (
    <>
      <PageIntro eyebrow={record.eyebrow} title={record.heading}>
        <p>{record.description}</p>
      </PageIntro>
      <PageBody id={page as PageId} />
    </>
  );
}
