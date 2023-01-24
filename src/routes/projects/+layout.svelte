<script lang="ts">
  import Toc from '$lib/components/Toc.svelte';
</script>

<Toc />

<main class="project">
  <slot />
</main>

<style lang="scss">
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
