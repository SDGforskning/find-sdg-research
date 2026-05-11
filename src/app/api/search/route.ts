import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const { GET } = createFromSource(source, {
  localeMap: {
    // [locale]: Orama options
    no: { language: 'norsk' },
    en: { language: 'english' },
  },
});
