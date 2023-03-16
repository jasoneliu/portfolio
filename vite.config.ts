import { defineConfig } from 'vite';
import { threeMinifier } from '@yushijinhun/three-minifier-rollup';
import { imagetools } from 'vite-imagetools';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [
    // Minimize three.js bundle size
    { ...threeMinifier(), enforce: 'pre' },

    // Convert images to webp
    imagetools({
      defaultDirectives: (url) => {
        const extension = url.pathname.substring(
          url.pathname.lastIndexOf('.') + 1
        );
        if (['jpg', 'png'].includes(extension)) {
          return new URLSearchParams({
            format: 'webp',
          });
        }
        return new URLSearchParams();
      },
    }),

    sveltekit(),
  ],

  ssr: {
    noExternal: ['three'],
  },
});
