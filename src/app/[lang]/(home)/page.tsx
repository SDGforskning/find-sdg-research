import { getPageImage, source } from '@/lib/source';
import { getMDXComponents } from '@/components/mdx';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default async function HomePage(props: PageProps<'/[lang]'>) {
  const { lang } = await props.params;
  const page = source.getPage([], lang);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <article className="mx-auto container max-w-6xl px-4 py-6 md:py-8">
      <MDX
        components={getMDXComponents({
          a: createRelativeLink(source, page),
        })}
      />
    </article>
  );
}

export async function generateMetadata(props: PageProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await props.params;
  const page = source.getPage([], lang);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
