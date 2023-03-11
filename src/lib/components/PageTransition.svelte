<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { cubicIn, cubicOut } from 'svelte/easing';
  import {
    beforeNavigate,
    afterNavigate,
    disableScrollHandling,
  } from '$app/navigation';
  import { pageTransitioning, url } from '$lib/store';
  import { slide } from '$lib/transition';

  // Page transition state
  let transitioningOut = false;

  // Animate page fly in
  let animatePageIn = true;

  // Animation timing
  const pageAnimationDurationMs: number = 500;
  const slideAnimationDurationMs: number = 500;
  const slideAnimationDelayMs: number = 250;

  // Styles for slide transition
  let slideTransition: HTMLElement;
  $: if (slideTransition) {
    if (transitioningOut) {
      // Enter from bottom
      slideTransition.style.top = 'auto';
      slideTransition.style.bottom = '0';
    } else {
      // Exit from top
      slideTransition.style.top = '0';
      slideTransition.style.bottom = 'auto';
    }
  }

  // Handle page transition when navigation occurs
  beforeNavigate((navigation) => {
    // No page transition for refresh
    if (!navigation.to?.url) {
      return;
    }

    // No page transition for navigation to current page
    if (navigation.from?.url.pathname === navigation.to?.url.pathname) {
      return;
    }

    // No page transition for navigation to resume (opens in new tab)
    if (navigation.to?.url.pathname === '/resume') {
      return;
    }

    // Animate page fly in
    animatePageIn = true;
    if (navigation.to?.url.pathname === '/' && $url.hash === '') {
      // No animation for home page (bubbles scene)
      animatePageIn = false;
    }

    // Begin page transition
    transitioningOut = true;
    pageTransitioning.set(true);
  });

  // Prevent scroll during page transition
  afterNavigate(() => {
    disableScrollHandling();
  });
</script>

<!-- Disable scrolling when page is transitioning -->
<svelte:head>
  {#if transitioningOut}
    <style lang="scss">
      body {
        overflow: hidden;
      }
    </style>
  {/if}
</svelte:head>

{#if transitioningOut}
  <div
    class="slide-transition"
    bind:this={slideTransition}
    in:slide={{
      duration: slideAnimationDurationMs,
      delay: pageAnimationDurationMs / 2,
      easing: cubicOut,
    }}
    out:slide={{
      duration: slideAnimationDurationMs,
      delay: slideAnimationDelayMs,
      easing: cubicIn,
    }}
    on:introend={() => {
      transitioningOut = false;
    }}
    on:outrostart={() => {
      setTimeout(() => pageTransitioning.set(false), slideAnimationDelayMs);
    }}
  />
{:else}
  <div
    class="page-transition"
    in:fly={{
      y: 200,
      duration: animatePageIn ? pageAnimationDurationMs : 0,
      delay: slideAnimationDelayMs + slideAnimationDurationMs / 2,
      easing: cubicOut,
    }}
    out:fade={{ duration: pageAnimationDurationMs }}
  >
    <slot />
  </div>
{/if}

<style lang="scss">
  .page-transition {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
  }

  .slide-transition {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 5;
    width: 100%;
    height: 100%;
    background-color: $mantle;
  }
</style>
