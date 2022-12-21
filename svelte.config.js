// import adapter from '@sveltejs/adapter-auto';
// import { vitePreprocess } from '@sveltejs/kit/vite';

// /** @type {import('@sveltejs/kit').Config} */
// const config = {
//   // Consult https://kit.svelte.dev/docs/integrations#preprocessors
//   // for more information about preprocessors
//   preprocess: vitePreprocess(),

//   kit: {
//     adapter: adapter()
//   }
// };

// export default config;

import adapter from '@sveltejs/adapter-auto';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [
    sveltePreprocess({
      scss: {
        prependData: `@import 'src/styles/_variables.scss';`
      }
    })
  ],

  kit: {
    adapter: adapter()
  }
};

export default config;
