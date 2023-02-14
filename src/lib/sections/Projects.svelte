<script lang="ts">
  import { onMount } from 'svelte';
  import InView from '$lib/components/InView.svelte';
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
  <InView>
    <h2>Projects</h2>
  </InView>
  <div class="projects__project-list">
    {#each Object.entries(projects) as [_, project] (project.slug)}
      <InView>
        <ProjectCard {project} />
      </InView>
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
