<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import Loader from '$lib/components/Loader.svelte';
  import Home from '$lib/sections/Home.svelte';
  import Projects from '$lib/sections/Projects.svelte';
  import Skills from '$lib/sections/Skills.svelte';
  import { url, hashScrolling, projectsAnchor, skillsAnchor } from '$lib/store';

  let scrollReady: boolean = false;
  let scrollBehavior: ScrollBehavior = 'auto';

  /** Scroll to home page section based on the page url. */
  function scrollToSection() {
    // Prevent scroll before first render
    if (!scrollReady) {
      return;
    }

    // Prevent scroll during page transition away from home page
    if ($page.url.pathname !== '/') {
      return;
    }

    // Prevent navbar from hiding during scroll
    hashScrolling.update((count) => count + 1);
    setTimeout(() => {
      hashScrolling.update((count) => count - 1);
    }, 750);

    // Scroll position for projects and skills sections
    let scrollTop: number = 0;
    if ($url.hash === '#projects') {
      scrollTop = $projectsAnchor.offsetTop - window.innerHeight / 10;
    } else if ($url.hash === '#skills') {
      scrollTop = $skillsAnchor.offsetTop - window.innerHeight / 10;
    }

    // Scroll to section
    scrollTo({
      top: scrollTop,
      behavior: scrollBehavior,
    });

    // Enable smooth scrolling after initial scroll
    scrollBehavior = 'smooth';
  }

  // Set url for initial scroll
  onMount(() => {
    scrollReady = true;
    url.set({ ...url, hash: $page.url.hash });
  });

  // Scroll to home page section
  $: $url, scrollToSection();
</script>

<svelte:head>
  <title>Jason Liu — Web Developer</title>
  <meta
    name="description"
    content="Portfolio and personal website of Jason Liu, a web developer and student at the University of Maryland."
  />

  <!-- Disable scrolling when page is loading -->
  {#if scrollBehavior === 'smooth'}
    <style lang="scss">
      html {
        scroll-behavior: smooth;
      }
    </style>
  {/if}
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
