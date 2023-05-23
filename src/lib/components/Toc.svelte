<script lang="ts">
  import { innerWidth } from '$lib/store';
  import Toc from 'svelte-toc';

  // Hide table of contents for small screen size
  const breakpoint = 992; // $breakpoint-lg
  $: showToc = $innerWidth > breakpoint;
</script>

{#if showToc}
  <div class="toc">
    <Toc
      {breakpoint}
      title=""
      headingSelector=":is(h3, h4):not(.toc-exclude)"
    />
  </div>
{/if}

<style lang="scss">
  .toc {
    position: fixed;
    top: 0;
    left: 1rem;
    padding: inherit;

    & :global(nav) {
      padding: 1rem;
      padding-top: 1.5rem;
      overflow-y: auto;
      animation-duration: 0s !important; // Disable svelte transition
    }

    & :global(li) {
      transition: color 0.3s, font-weight 0s;
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
</style>
