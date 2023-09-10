import sequence from 'svelte-sequential-preprocessor';
import sveltePreprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: sequence([
    sveltePreprocess({
      replace: [
        [
          'import.meta.env.VERCEL_ANALYTICS_ID',
          JSON.stringify(process.env.VERCEL_ANALYTICS_ID),
        ],
      ],
      scss: {
        prependData: `@use 'src/styles/_variables.scss' as *;`,
      },
    }),
    mdsvex({
      layout: './src/lib/components/mdsvex/Layout.svelte',
    }),
  ]),

  extensions: ['.svelte', '.svx'],

  kit: {
    adapter: adapter(),
    serviceWorker: {
      register: false,
    },
  },
};

export default config;
