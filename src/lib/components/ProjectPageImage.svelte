<script lang="ts">
  import ResponsiveImage from '$lib/components/ResponsiveImage.svelte';
  import type { Image } from '$lib/image';

  export let image: Image;
  export let href: string | undefined = undefined;
  export let alt: string;
  export let caption: string | undefined = undefined;
</script>

<div class="project-image">
  {#if href}
    <a {href} target="_blank">
      <ResponsiveImage {image} {alt} />
    </a>
  {:else}
    <ResponsiveImage {image} {alt} />
  {/if}

  {#if caption}
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    <caption>{@html caption}</caption>
  {/if}
</div>

<style lang="scss">
  .project-image {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1.5rem 0;
    padding: 0 10%;

    @media screen and (max-width: $breakpoint-md) {
      padding: 0 5%;
    }

    & :global(img) {
      max-height: 60vh;
      box-shadow: 0 0 1rem 0.125rem rgba($text, 0.1);
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
