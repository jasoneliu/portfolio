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
  import { pwaInfo } from 'virtual:pwa-info';
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

  // PWA web app manifest
  $: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';

  onMount(async () => {
    // Update url hash on navigation
    window.addEventListener('hashchange', () => {
      url.set({ ...url, hash: location.hash });
    });

    // Disable "Add to Home Screen" mini-infobar on mobile
    window.addEventListener('beforeinstallprompt', (event: Event) => {
      event.preventDefault();
    });

    // Register PWA service worker
    if (pwaInfo) {
      const { registerSW } = await import('virtual:pwa-register');
      registerSW({
        immediate: true,
        onRegistered(registration: ServiceWorkerRegistration | undefined) {
          // Check for updates every 24 hours
          if (registration) {
            setInterval(() => {
              registration.update();
            }, 1000 * 60 * 60 * 24);
          }
        },
      });
    }
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

  <!-- PWA web app manifest -->
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html webManifest}
  <meta name="theme-color" content="#1e1e2e" />
</svelte:head>

<Navbar />
<PageTransition>
  <div class="background-gradient" slot="background" />
  <div class="page" slot="page">
    <slot />
    <Footer />
  </div>
</PageTransition>

<style lang="scss">
  // CSS linear-gradient causes banding on Firefox
  // This is a workaround using a PNG background-image for the linear-gradient
  .background-gradient {
    position: absolute;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100dvh;
    background-image: url('$lib/assets/background-gradient.png');
    background-repeat: no-repeat;
    background-size: 100% 100dvh;

    @media screen and (max-width: $breakpoint-md) {
      top: 4rem;
      height: calc(100dvh - 4rem);
      background-size: 100% calc(100dvh - 4rem);
    }
  }

  .page {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-grow: 1;
    padding-top: 6.5rem;
  }
</style>
