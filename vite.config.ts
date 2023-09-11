import { defineConfig } from 'vite';
import { threeMinifier } from '@yushijinhun/three-minifier-rollup';
import { imagetools } from 'vite-imagetools';
import { sveltekit } from '@sveltejs/kit/vite';
// import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
  plugins: [
    // Minimize three.js bundle size
    { ...threeMinifier(), enforce: 'pre' },

    // Generate srcset for .avif and .webp images
    imagetools({
      defaultDirectives: (url) => {
        if (url.searchParams.toString().length > 0) {
          return new URLSearchParams({
            srcset: 'true',
            width: '500;1000;2000',
          });
        }
        return new URLSearchParams();
      },
    }),

    sveltekit(),

    // PWA
    // SvelteKitPWA({
    //   strategies: 'generateSW',
    //   registerType: 'autoUpdate',
    //   base: '/',
    //   scope: '/',
    //   workbox: {
    //     // Exclude /resume from sw precache
    //     navigateFallbackDenylist: [/\/resume/],
    //   },
    //   manifest: {
    //     name: 'Jason Liu',
    //     short_name: 'Jason Liu',
    //     description:
    //       'Portfolio and personal website of Jason Liu, a web developer and student at the University of Maryland.',
    //     start_url: '/',
    //     scope: '/',
    //     display: 'standalone',
    //     background_color: '#1e1e2e',
    //     theme_color: '#1e1e2e',
    //     icons: [
    //       {
    //         src: '/icon-192.png',
    //         sizes: '192x192',
    //         type: 'image/png',
    //         purpose: 'any',
    //       },
    //       {
    //         src: '/icon-maskable-192.png',
    //         sizes: '192x192',
    //         type: 'image/png',
    //         purpose: 'maskable',
    //       },
    //       {
    //         src: '/icon-512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //         purpose: 'any',
    //       },
    //       {
    //         src: '/icon-maskable-512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //         purpose: 'maskable',
    //       },
    //     ],
    //   },
    // }),
  ],

  ssr: {
    noExternal: ['three'],
  },
});
