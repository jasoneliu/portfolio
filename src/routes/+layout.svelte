<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import PageTransition from '$lib/components/PageTransition.svelte';
  import { url, loading } from '$lib/store';
  import '../app.scss';

  onMount(() => {
    // Disable loader for non-home pages
    if ($page.url.pathname !== '/') {
      loading.set(false);
    }

    // Update url hash on navigation
    window.addEventListener('hashchange', () => {
      url.set({ ...url, hash: location.hash });
    });
  });
</script>

<svelte:head>
  <meta name="author" content="Jason Liu" />

  <!-- https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs -->
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" href="/icon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />

  <meta property="og:title" content="Jason Liu — Web Developer" />
  <meta
    property="og:description"
    content="Portfolio and personal website of Jason Liu, a web developer and student at the University of Maryland."
  />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="" />
  <meta property="og:url" content="https://www.jasoneliu.com" />
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
