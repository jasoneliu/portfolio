<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import PageTransition from '$lib/components/PageTransition.svelte';
  import {
    innerWidth,
    scrollY,
    pageLoading,
    url,
    mobileLayout,
  } from '$lib/store';
  import { webVitals } from '$lib/vitals';
  import '../app.scss';

  let windowInnerWidth: number;
  let windowScrollY: number;

  // Update window bindings and mobile layout
  $: innerWidth.set(windowInnerWidth);
  $: scrollY.set(windowScrollY);
  $: mobileLayout.set(windowInnerWidth < 768); // $breakpoint-md

  // Disable loader for non-home pages
  if ($page.url.pathname !== '/') {
    pageLoading.set(false);
  }

  // Set Open Graph url pathname without trailing slash
  let ogUrlPathname: string;
  $: ogUrlPathname = $page.url.pathname === '/' ? '' : $page.url.pathname;

  // Vercel analytics
  let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;
  $: if (browser && analyticsId) {
    webVitals({
      path: $page.url.pathname,
      params: $page.params,
      analyticsId,
    });
  }

  // Update url hash on navigation
  onMount(() => {
    window.addEventListener('hashchange', () => {
      url.set({ ...url, hash: location.hash });
    });
  });
</script>

<!-- Bind screen width and scroll position -->
<svelte:window
  bind:innerWidth={windowInnerWidth}
  bind:scrollY={windowScrollY}
/>

<svelte:head>
  <meta name="author" content="Jason Liu" />
  <meta property="og:image" content="/og-image.png" />
  <meta property="og:site_name" content="Jason Liu" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.jasoneliu.com{ogUrlPathname}" />

  <!-- https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs -->
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" href="/icon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
</svelte:head>

<Navbar />
<PageTransition>
  <div class="page">
    <slot />
  </div>
  <Footer />
</PageTransition>

<style lang="scss">
  .page {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-grow: 1;
    padding-top: 8rem;
  }
</style>
