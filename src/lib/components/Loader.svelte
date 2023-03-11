<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { cubicOut, cubicInOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';
  import logo from '$lib/assets/logo.svg';
  import { pageLoading } from '$lib/store';
  import { slide } from '$lib/transition';

  // Animation timing
  const loadingAnimationDurationMs: number = 750;
  const loadingAnimationDelayMs: number = 150;
  const outroAnimationDurationMs: number = 750;

  // Loader state
  let loadingDone: boolean = false;
  let loadingPercentage = tweened<number>(0, {
    duration: loadingAnimationDurationMs,
    easing: cubicInOut,
  });

  // Run svelte transitions on first render
  let animationReady: boolean = false;

  // Animate loader
  onMount(async () => {
    // Begin loading animation
    animationReady = true;
    loadingPercentage.set(100);

    // Finish loading animation
    await new Promise<void>((resolve) =>
      setTimeout(() => {
        loadingDone = true;
        loadingPercentage.set(0);
        resolve();
      }, loadingAnimationDurationMs + loadingAnimationDelayMs)
    );

    // Begin loader outro animation
    await new Promise<void>((resolve) =>
      setTimeout(() => {
        pageLoading.set(false);
        resolve();
      }, loadingAnimationDurationMs + loadingAnimationDelayMs)
    );
  });
</script>

<!-- Disable scrolling when page is loading -->
<svelte:head>
  {#if $pageLoading}
    <style lang="scss">
      body {
        overflow: hidden;
      }
    </style>
  {/if}
</svelte:head>

{#if $pageLoading}
  <div
    class="loader"
    out:slide={{ duration: outroAnimationDurationMs, easing: cubicOut }}
  >
    {#if animationReady}
      <img
        class="loader__icon"
        src={logo}
        alt="Icon"
        in:fly={{
          y: 25,
          delay: loadingAnimationDelayMs,
          duration: loadingAnimationDurationMs,
          easing: cubicOut,
        }}
        out:fly={{
          y: 150,
          duration: outroAnimationDurationMs,
          opacity: 1,
          easing: cubicOut,
        }}
      />
      <div class="loader__wrapper">
        <div class="loader__background" class:outro={loadingDone} />
        <div
          class="loader__bar"
          class:outro={loadingDone}
          style:width={`${$loadingPercentage}%`}
        />
      </div>
    {/if}
  </div>
{/if}

<style lang="scss">
  .loader {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    z-index: 20;
    width: 100vw;
    height: 100dvh;
    overflow: hidden;
    background-color: $crust;

    &__icon {
      width: 5rem;
    }

    &__wrapper {
      position: relative;
      display: block;
      width: 20rem;
      height: 0.2rem;
    }

    &__background {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 1rem;
      background-color: $surface2;

      &.outro {
        width: 0;
        right: 0;
      }
    }

    &__bar {
      position: absolute;
      height: 100%;
      border-radius: 1rem;
      background-color: $text;

      &.outro {
        right: 0;
      }
    }
  }
</style>
