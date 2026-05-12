import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { getPageImage, source } from "@/lib/source";
import { generate, getImageResponseOptions } from "./generate";

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<"/[lang]/og/docs/[...slug]">,
) {
  const { lang, slug } = await params;
  const page = source.getPage(slug.slice(0, -1), lang);
  if (!page) notFound();

  return new ImageResponse(
    generate({
      title: page.data.title,
      description: page.data.description,
      lang,
    }),
    getImageResponseOptions(),
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImage(page).segments,
  }));
}
