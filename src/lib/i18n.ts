import { defineI18n } from 'fumadocs-core/i18n';

export const i18n = defineI18n({
  parser: 'dir',
  languages: ['no', 'en'],
  defaultLanguage: 'no',
  hideLocale: 'default-locale',
  fallbackLanguage: 'no',
});