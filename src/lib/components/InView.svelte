<script lang="ts">
  import { cubicOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
  import { inview, type Options, type ScrollDirection } from 'svelte-inview';
  import { pageLoading, pageTransitioning } from '$lib/store';

  // svelte-inview options
  export let options: Options = {
    rootMargin: '-100px',
    unobserveOnEnter: true,
  };

  // Option to disable inview (always show component)
  export let disabled: boolean = false;

  // Transition options
  export let y: number = 100;
  export let duration: number = 500;
  export let delay: number = 0;
  export let inline: boolean = false;
  export let overflowHidden: boolean = false;

  // InView component
  let inViewRef: HTMLElement;

  // InView state
  let inView: boolean;
  let scrollDirection: ScrollDirection;

  // InView edge cases
  let firstRender: boolean = true;
  let aboveViewport: boolean = false;

  // Handle edge cases
  $: if (!$pageLoading && !$pageTransitioning) {
    // Animate if in-view on first render
    setTimeout(() => {
      firstRender = false;
    }, 500);

    // Visible (no animation) if above viewport
    if (inViewRef && inViewRef.getBoundingClientRect().bottom < 250) {
      aboveViewport = true;
    }
  }
</script>

<div
  bind:this={inViewRef}
  class="in-view-wrapper"
  class:inline
  class:overflow-hidden={overflowHidden}
  use:inview={options}
  on:inview_change={({ detail }) => {
    inView = detail.inView;
    scrollDirection = detail.scrollDirection;
  }}
>
  {#if inView || aboveViewport || disabled}
    <div
      class="in-view--show"
      in:fly={!aboveViewport &&
      !disabled &&
      (firstRender || scrollDirection.vertical === 'up')
        ? { y, duration, delay, easing: cubicOut }
        : { duration: 0 }}
    >
      <slot />
    </div>
  {:else}
    <div class="in-view--hide">
      <slot />
    </div>
  {/if}
</div>

<style lang="scss">
  .in-view {
    &-wrapper {
      &.inline {
        display: inline-block;
        vertical-align: top;
      }

      &.overflow-hidden {
        overflow: hidden;
      }
    }

    &--hide {
      opacity: 0;
    }
  }
</style>
