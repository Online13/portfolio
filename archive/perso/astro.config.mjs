// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://nekena-rayane.com',
  // English at /, French at /fr/.
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
  },
  // fr/404.astro builds to fr/404.html, the not-found page Cloudflare serves under /fr/.
  build: {
    format: 'preserve',
  },
  // Self-hosted at build time: no render-blocking request to Google Fonts.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Cabin',
      cssVariable: '--font-cabin',
      weights: ['400 700'],
      styles: ['normal', 'italic'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.google(),
      // On trial for the perso mode. OFL licensed (src/assets/fonts/libron/OFL.txt).
      provider: fontProviders.local(),
      name: 'Libron',
      cssVariable: '--font-libron',
      options: {
        variants: [
          { weight: 400, style: 'normal', src: ['./src/assets/fonts/libron/Libron-Regular.woff2'] },
          { weight: 400, style: 'italic', src: ['./src/assets/fonts/libron/Libron-Italic.woff2'] },
          { weight: 700, style: 'normal', src: ['./src/assets/fonts/libron/Libron-Bold.woff2'] },
          { weight: 700, style: 'italic', src: ['./src/assets/fonts/libron/Libron-BoldItalic.woff2'] },
        ],
      },
      fallbacks: ['serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: ['400 700'],
      fallbacks: ['sans-serif'],
    },
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  devToolbar: {
    enabled: false
  }
});