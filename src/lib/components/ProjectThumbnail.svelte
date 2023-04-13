<script lang="ts">
  import ResponsiveImage from '$lib/components/ResponsiveImage.svelte';
  import type { Image } from '$lib/image';

  export let image: Image;
  export let alt: string;
</script>

<div class="project-card__image">
  <ResponsiveImage {image} {alt} />
</div>

<style lang="scss">
  .project-card__image :global(img) {
    width: 100%;
    aspect-ratio: 3 / 2;
  }
</style>
