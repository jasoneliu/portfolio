<script lang="ts">
  import { onMount } from 'svelte';
  import type { Project } from '$lib/projects';

  export let project: Project;

  // Set img src after mount to prevent eager fetching of fallback image
  // https://github.com/facebook/react/issues/20682#issuecomment-1140181778
  let projectImageRef: HTMLImageElement;
  onMount(() => {
    projectImageRef.src = project.image.fallback;
  });
</script>

<picture>
  <source srcset={project.image.avif} type="image/avif" />
  <source srcset={project.image.webp} type="image/webp" />
  <img bind:this={projectImageRef} class="project-image" alt={project.name} />
</picture>

<style lang="scss">
  .project-image {
    width: 100%;
    border-radius: 0.5rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
  }
</style>
