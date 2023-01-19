<script lang="ts">
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import { projects } from '$lib/projects';
</script>

<section class="projects" id="projects">
  <h2 class="projects__header">Projects</h2>
  <div class="projects__project-list">
    {#each projects as project}
      <ProjectCard {project} />
    {/each}
  </div>
</section>

<style lang="scss">
  .projects {
    &__header {
      text-align: center;
    }

    &__project-list {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
</style>
