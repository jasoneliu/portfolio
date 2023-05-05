<script lang="ts">
  import { cubicOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
  import { inview, type Options, type ScrollDirection } from 'svelte-inview';
  import { pageLoading, pageTransitioning } from '$lib/store';

  // svelte-inview options
  export let rootMargin = '-15%';
  export let unobserveOnEnter = true;
  const options: Options = {
    rootMargin,
    unobserveOnEnter,
  };

  // Option to disable inview (always show component)
  export let disabled = false;

  // Transition options
  export let y = 100;
  export let duration = 500;
  export let delay = 0;
  export let inline = false;
  export let inlineBlock = false;
  export let overflowHidden = false;

  // InView component
  let inViewRef: HTMLElement;

  // InView state
  let inView: boolean;
  let scrollDirection: ScrollDirection;

  // InView edge cases
  let firstRender = true;
  let aboveViewport = false;

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

<span
  bind:this={inViewRef}
  class="in-view"
  class:inline
  class:inline-block={inlineBlock}
  class:overflow-hidden={overflowHidden}
  use:inview={options}
  on:inview_change={({ detail }) => {
    inView = detail.inView;
    scrollDirection = detail.scrollDirection;
  }}
>
  {#if inView || aboveViewport || disabled}
    <span
      class="in-view__content--show"
      in:fly={!aboveViewport &&
      !disabled &&
      (firstRender || scrollDirection.vertical === 'up')
        ? { y, duration, delay, easing: cubicOut }
        : { duration: 0 }}
    >
      <slot {inView} />
    </span>
  {:else}
    <span class="in-view__content--hide">
      <slot {inView} />
    </span>
  {/if}
</span>

<style lang="scss">
  .in-view {
    &:not(.inline, .inline-block) {
      display: block;

      & .in-view__content--show,
      .in-view__content--hide {
        display: block;
      }
    }

    &.inline {
      display: inline;

      & .in-view__content--show,
      .in-view__content--hide {
        display: inline;
      }
    }

    &.inline-block {
      display: inline-block;
      vertical-align: top;

      & .in-view__content--show,
      .in-view__content--hide {
        display: inline-block;
      }
    }

    &.overflow-hidden {
      overflow: hidden;
    }

    &__content {
      &--hide {
        opacity: 0;
      }
    }
  }
</style>
