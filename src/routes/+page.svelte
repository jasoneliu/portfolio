<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import Home from '$lib/sections/Home.svelte';
  import Projects from '$lib/sections/Projects.svelte';
</script>

<svelte:head>
  <title>Jason Liu — Web Developer</title>
  <meta
    name="description"
    content="Portfolio and personal website of Jason Liu, a web developer and student at the University of Maryland."
  />
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
  <Home />
  <Projects />
</div>

<style lang="scss">
  .page {
    display: flex;
    flex-flow: column nowrap;
    gap: 10vh;
  }
</style>
