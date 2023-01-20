<script lang="ts">
  import Toc from 'svelte-toc';

  const breakpoint = 992; // $breakpoint-lg
  let innerWidth: number;
  $: showToc = innerWidth > breakpoint;
</script>

<!-- Bind screen width -->
<svelte:window bind:innerWidth />

{#if showToc}
  <div class="toc">
    <Toc
      {breakpoint}
      title=""
      headingSelector=":is(h3, h4):not(.toc-exclude)"
    />
  </div>
{/if}

<main class="project">
  <slot />
</main>

<style lang="scss">
  .toc {
    position: fixed;
    top: 0;
    left: 1rem;
    padding: inherit;

    & :global(nav) {
      animation-duration: 0s !important; // Disable svelte transition
    }

    & :global(li) {
      transition: color 300ms, font-weight 0ms;
      background-color: transparent;
      color: $subtext0;
      font-weight: 400;

      &:hover {
        color: $text;
        font-weight: 900;
      }

      &:is(.active) {
        color: $text;
        font-weight: 900;
      }
    }
  }

  .project {
    display: block;
    margin-left: 5rem;
    max-width: 50rem;
    padding: 0 2rem;

    @media screen and (max-width: $breakpoint-xl) {
      margin-left: 8rem;
      max-width: 45rem;
    }

    @media screen and (max-width: $breakpoint-lg) {
      margin: 0;
    }

    & :global(.project__description) {
      margin: 0;
      text-align: center;
    }

    & :global(h2) {
      margin-block-start: 0rem;
      margin-block-end: 1rem;
      text-align: center;
    }

    & :global(h3) {
      margin-block-start: 5rem;
      margin-block-end: -1rem;
      text-align: center;
    }

    & :global(h4) {
      margin-block-start: 3rem;
      margin-block-end: 1rem;
    }

    & :global(p) {
      margin-block-start: 1rem;
      margin-block-end: 1rem;
    }

    & :global(ul),
    :global(ol) {
      margin-block-start: 1rem;
      margin-block-end: 1rem;
      padding-inline-start: 2rem;
    }
  }
</style>
