<script lang="ts">
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { inview, type Options, type ScrollDirection } from 'svelte-inview';

  // svelte-inview options
  export let options: Options = {
    rootMargin: '-100px',
    unobserveOnEnter: true,
  };

  // Transition options
  export let y: number = 100;
  export let duration: number = 500;
  export let delay: number = 0;

  let inView: boolean;
  let scrollDirection: ScrollDirection;
</script>

<div
  class="in-view-wrapper"
  use:inview={options}
  on:change={({ detail }) => {
    inView = detail.inView;
    scrollDirection = detail.scrollDirection;
  }}
>
  {#if inView}
    <div
      class="in-view--show"
      in:fly={scrollDirection.vertical === 'up'
        ? { y, duration, delay, easing: cubicOut }
        : { duration: 0 }}
    >
      <slot {inView} />
    </div>
  {:else}
    <div class="in-view--hide">
      <slot {inView} />
    </div>
  {/if}
</div>

<style lang="scss">
  .in-view--hide {
    opacity: 0;
  }
</style>
