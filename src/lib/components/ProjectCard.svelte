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
      <span class="project-card__position">{project.position}</span>
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
      display: grid;
      grid-template-rows: auto;
      grid-template-columns: 1fr 1fr;
      row-gap: 1.5rem;
      column-gap: 3rem;

      max-width: 100rem;
      padding: 2rem;

      @media screen and (max-width: $breakpoint-md) {
        grid-template-rows: auto auto;
        grid-template-columns: 1fr;
      }
    }

    &__image {
      width: 100%;
      border-radius: 0.5rem;
      aspect-ratio: 4 / 3;
      object-fit: cover;
    }

    &__info {
      display: flex;
      flex-flow: column nowrap;
      gap: 1rem;
    }

    &__position {
      margin-bottom: -0.25rem;
      color: $subtext0;
      font-size: 0.875rem;
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
