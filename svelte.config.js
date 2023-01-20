import adapter from '@sveltejs/adapter-auto';
import sveltePreprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [
    sveltePreprocess({
      scss: {
        prependData: `@use 'src/styles/_variables.scss' as *;`,
      },
    }),
    mdsvex(),
  ],

  extensions: ['.svelte', '.svx'],

  kit: {
    adapter: adapter(),
  },
};

export default config;
