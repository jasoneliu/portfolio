<script lang="ts">
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import type { Project } from '$lib/projects';

  export let projects: Project[];
</script>

<div class="project-list">
  {#each projects as project}
    <ProjectCard {project} />
  {/each}
</div>

<style lang="scss">
  .project-list {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }
</style>
