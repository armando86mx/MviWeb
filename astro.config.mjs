// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE_URL = process.env.PUBLIC_SITE_URL || 'https://amorygraciapuebla.org';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  // El preview de Claude asigna puerto vía PORT; sin la env se queda el default 4321.
  server: { port: Number(process.env.PORT) || 4321 },
  // /visitanos se fusionó en /contacto (su contenido vive al final, #primera-visita)
  redirects: {
    '/visitanos': '/contacto',
  },
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/api/') &&
        !page.includes('/404'),
      changefreq: 'weekly',
      priority: 0.7,
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-MX' },
      },
    }),
  ],
});
