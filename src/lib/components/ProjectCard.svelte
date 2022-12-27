<script lang="ts">
  import LinkButton from '$lib/components/LinkButton.svelte';
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
      <span class="project-card__details">{project.position}</span>
      <h3 class="project-card__name">{project.name}</h3>
      <p class="project-card__description">{project.description}</p>
      <div class="project-card__tags">
        {#each project.tags as tag}
          <Tag text={tag.text} color={tag.color} />
        {/each}
      </div>
      <div class="project-card__button">
        <LinkButton text="LEARN MORE" link={project.link} />
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
      row-gap: 1.5rem;

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

    &__details {
      color: $subtext1;
      font-size: 0.875rem;
      margin-bottom: -0.25rem;
    }

    &__name {
      margin-bottom: -0.25rem;
    }

    &__tags {
      display: flex;
      flex-flow: row wrap;
      gap: 0.5rem;
    }

    &__button {
      margin-top: 1rem;
    }
  }
</style>
