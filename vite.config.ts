import { defineConfig } from 'vite';
import { threeMinifier } from '@yushijinhun/three-minifier-rollup';
import { imagetools } from 'vite-imagetools';
import { sveltekit } from '@sveltejs/kit/vite';

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
  ],

  ssr: {
    noExternal: ['three'],
  },
});
