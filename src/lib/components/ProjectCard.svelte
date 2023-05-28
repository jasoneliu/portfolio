<script lang="ts">
  import LinkButton from '$lib/components/LinkButton.svelte';
  import ProjectThumbnail from '$lib/components/ProjectThumbnail.svelte';
  import TagList from '$lib/components/TagList.svelte';
  import type { Project } from '$lib/projects';

  export let project: Project;
</script>

<div class="project-card">
  <div class="project-card__card">
    <a href="/projects/{project.slug}">
      <ProjectThumbnail image={project.image} alt={project.name} />
    </a>
    <div class="project-card__info">
      <span class="project-card__role">
        {[project.role].flat().join(' | ')}
      </span>
      <h3 class="project-card__name">{project.name}</h3>
      <p class="project-card__description">{project.description}</p>
      <TagList tags={project.tags} />
      <div class="project-card__button">
        <LinkButton text="LEARN MORE" link="/projects/{project.slug}" />
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .project-card {
    display: flex;
    justify-content: center;
    width: 100%;

    &__card {
      display: grid;
      grid-template-rows: auto;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem 3rem;

      max-width: 100rem;
      padding: 2rem 8vw;

      @media screen and (max-width: $breakpoint-md) {
        grid-template-rows: auto auto;
        grid-template-columns: 1fr;
        padding: 2rem 1.5rem;
      }
    }

    &__info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    &__role {
      margin-bottom: -0.25rem;
      color: $subtext0;
      font-size: 0.875rem;
    }

    &__name {
      margin-bottom: -0.25rem;
    }

    &__button {
      margin-top: 1rem;
    }
  }
</style>
