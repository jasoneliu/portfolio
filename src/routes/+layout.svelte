<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import '../app.scss';
</script>

<svelte:head>
  <meta name="author" content="Jason Liu" />
  <meta property="og:title" content="Jason Liu — Web Developer" />
  <meta
    property="og:description"
    content="Portfolio and personal website of Jason Liu, a web developer and student at the University of Maryland."
  />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="" />
  <meta property="og:url" content="https://www.jasoneliu.com" />
</svelte:head>

<div class="page">
  <Navbar />
  <div class="page__content">
    <slot />
  </div>
  <Footer />
</div>

<style lang="scss">
  .page {
    display: flex;
    flex-flow: column nowrap;
    min-height: 100dvh;

    &__content {
      display: flex;
      justify-content: center;
      flex-flow: column nowrap;
      flex-grow: 1;
      gap: 10vh;
      padding-top: 20vh;
      height: 100%;
    }
  }
</style>
