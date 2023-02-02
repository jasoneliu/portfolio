<script lang="ts">
  import Home from '$lib/sections/Home.svelte';
  import Projects from '$lib/sections/Projects.svelte';
  import Skills from '$lib/sections/Skills.svelte';
</script>

<svelte:head>
  <title>Jason Liu — Web Developer</title>
  <meta
    name="description"
    content="Portfolio and personal website of Jason Liu, a web developer and student at the University of Maryland."
  />
</svelte:head>

<main class="index">
  <Home />
  <Projects />
  <Skills />
</main>

<style lang="scss">
  .index {
    display: flex;
    flex-direction: column;
    gap: 10vh;
  }

  :global(h2) {
    text-align: center;
  }
</style>
