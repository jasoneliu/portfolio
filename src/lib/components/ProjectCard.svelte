<script lang="ts">
  import Tag from '$lib/components/Tag.svelte';
  import type { Project } from '$lib/projects';

  export let project: Project;
</script>

<div class="project-card">
  <div class="project-card__card">
    <picture>
      <img class="project-card__image" src={project.image} alt={project.name} />
    </picture>
    <div class="project-card__info">
      <h3 class="project-card__name">{project.name}</h3>
      <p class="project-card__description">{project.description}</p>
      <div class="project-card__tags">
        {#each project.tags as tag}
          <Tag text={tag.text} color={tag.color} />
        {/each}
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .project-card {
    display: flex;
    justify-content: center;
    width: 100%;

    &:nth-child(even) {
      background-color: $mantle;
    }

    &__card {
      column-gap: 3rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto;
      max-width: 100rem;
      padding: 2rem 2rem;
      row-gap: 1rem;

      @media (max-width: $breakpoint-md) {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
      }
    }

    &__image {
      aspect-ratio: 4 / 3;
      border-radius: 0.5rem;
      object-fit: cover;
      width: 100%;
    }

    &__info {
      display: flex;
      flex-flow: column nowrap;
      gap: 1rem;
    }

    &__tags {
      display: flex;
      flex-flow: row wrap;
      gap: 0.5rem;
    }
  }
</style>
