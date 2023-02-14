<script lang="ts">
  import { onMount } from 'svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import { projects } from '$lib/projects';
  import { projectsAnchor } from '$lib/store';

  // Set projects section anchor for navigation
  let projectsSection: HTMLElement;
  onMount(() => {
    projectsAnchor.set(projectsSection);
  });
</script>

<section class="projects" bind:this={projectsSection}>
  <h2>Projects</h2>
  <div class="projects__project-list">
    {#each Object.entries(projects) as [_, project] (project.slug)}
      <ProjectCard {project} />
    {/each}
  </div>
</section>

<style lang="scss">
  .projects {
    &__project-list {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
</style>
