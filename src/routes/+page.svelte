<script lang="ts">
  import { onMount } from 'svelte';
  import { page, navigating } from '$app/stores';
  import Loader from '$lib/components/Loader.svelte';
  import Home from '$lib/sections/Home.svelte';
  import Projects from '$lib/sections/Projects.svelte';
  import Skills from '$lib/sections/Skills.svelte';
  import { projectsAnchor, skillsAnchor } from '$lib/store';

  let scrollReady: boolean = false;

  /** Scroll to home page section based on the page url. */
  function scrollToSection(firstRender: boolean) {
    // Prevent scroll before first render
    if (!scrollReady) {
      return;
    }

    // Prevent scroll during page transition
    if ($page.route.id !== '/') {
      return;
    }

    let scrollTop: number = 0;
    let scrollBehavior: ScrollBehavior = 'auto';

    // Scroll position for projects and skills sections
    if ($page.url.href.endsWith('/#projects')) {
      scrollTop = $projectsAnchor.offsetTop - window.innerHeight / 10;
    }
    if ($page.url.href.endsWith('/#skills')) {
      scrollTop = $skillsAnchor.offsetTop - window.innerHeight / 10;
    }

    // Smooth scroll behavior within home page
    console.log($navigating, $page.route.id, $page.url.href);
    if (!firstRender) {
      scrollBehavior = 'smooth';
    }

    // Scroll to section
    console.log('scrolling to', scrollTop, scrollBehavior);
    scrollTo({
      top: scrollTop,
      behavior: scrollBehavior,
    });
  }

  // Scroll on first render
  onMount(() => {
    scrollReady = true;
    setTimeout(() => scrollToSection(true), 0);
  });

  // Scroll within home page
  $: $page.url.href, scrollToSection(false);
</script>

<svelte:head>
  <title>Jason Liu — Web Developer</title>
  <meta
    name="description"
    content="Portfolio and personal website of Jason Liu, a web developer and student at the University of Maryland."
  />
</svelte:head>

<Loader />
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
