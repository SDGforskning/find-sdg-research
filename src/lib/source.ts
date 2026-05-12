import { docs } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { i18n } from '@/lib/i18n';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { docsImageRoute, docsRoute } from './shared';

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
  i18n,
});

export function getPageImage(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `${docsImageRoute}/${segments.join('/')}`,
  };
}