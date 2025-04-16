import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [
    tailwind({
      // applyBaseStyles: false
    }),
    react(),
    sitemap({
      lastmod: new Date(),
      changefreq: 'daily',
      priority: 0.7,
      filter: (page) => !page.url.includes('/secret/'),
      defaultLocale: 'es',
      entryLimit: 50000,
      createLinkInHead: true,
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          es: 'es'
        }
      }
    })
  ],
  site: 'https://kodeksa.lat',
  build: {
    minify: true,
    cssMinify: true,
    jsMinify: true
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    }
  }
});