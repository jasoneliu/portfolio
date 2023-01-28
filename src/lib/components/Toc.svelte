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

<style lang="scss">
  .toc {
    position: fixed;
    top: 0;
    left: 1rem;
    padding: inherit;

    & :global(nav) {
      padding: 1rem;
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
</style>
