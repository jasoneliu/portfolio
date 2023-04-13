<script lang="ts">
  import ResponsiveImage from '$lib/components/ResponsiveImage.svelte';
  import type { Image } from '$lib/image';

  export let image: Image;
  export let alt: string;
  export let caption: string | undefined = undefined;
</script>

<div class="project-image">
  <ResponsiveImage {image} {alt} />
  {#if caption}
    <caption>{@html caption}</caption>
  {/if}
</div>

<style lang="scss">
  .project-image {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem 0;

    & :global(picture) {
      width: 80%;
    }
  }

  caption {
    margin-top: 0.5rem;
    text-align: center;
    font-size: 1rem;
    font-style: italic;
    color: $subtext0;
  }
</style>
