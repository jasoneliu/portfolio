<script lang="ts">
  import { onMount } from 'svelte';
  import type { Image } from '$lib/image';

  export let image: Image;
  export let alt: string;

  // Set img src after mount to prevent eager fetching of fallback image
  // https://github.com/facebook/react/issues/20682#issuecomment-1140181778
  let imageRef: HTMLImageElement;
  onMount(() => {
    imageRef.src = image.fallback;
  });
</script>

<picture>
  <source srcset={image.avif} type="image/avif" />
  <source srcset={image.webp} type="image/webp" />
  <img bind:this={imageRef} {alt} />
</picture>

<style lang="scss">
  img {
    border-radius: 0.5rem;
    object-fit: cover;
  }
</style>
