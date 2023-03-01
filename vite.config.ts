import { defineConfig } from 'vite';
import { threeMinifier } from '@yushijinhun/three-minifier-rollup';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [{ ...threeMinifier(), enforce: 'pre' }, sveltekit()],
  ssr: {
    noExternal: ['three'],
  },
});
