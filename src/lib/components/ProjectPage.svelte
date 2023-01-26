<script lang="ts">
  import TagList from '$lib/components/TagList.svelte';
  import type { Project } from '$lib/projects';

  export let project: Project;

  const projectTitle: string = project.head?.title ?? project.name;
</script>

<svelte:head>
  <title>{projectTitle} — Jason Liu</title>
  <meta
    name="description"
    content={project.head?.description ??
      `${projectTitle}. ${project.description}`}
  />
</svelte:head>

<div class="project__head">
  <h2 class="project__head__title">{project.name}</h2>
  <p class="project__head__description">{project.description}</p>
  <img class="project__head__image" src={project.image} alt={project.name} />
</div>

<div class="project__info">
  <div>
    <h4 class="toc-exclude">Role</h4>
    <p>{project.role}</p>
  </div>

  <div>
    <h4 class="toc-exclude">Timeline</h4>
    <p>{project.timeline}</p>
  </div>

  <div>
    <h4 class="toc-exclude">Skills</h4>
    <div class="project__info__skills">
      {#each project.skills as skill}
        <p>{skill}</p>
      {/each}
    </div>
  </div>

  <div>
    <h4 class="toc-exclude">Tools</h4>
    <TagList tags={project.tags} />
  </div>
</div>

<div class="project__content">
  <slot />
</div>

<style lang="scss">
  .project {
    &__head {
      &__title {
        /* margin-block-start: 0rem; */
        margin-block-end: 0.5rem;
        text-align: center;
      }

      &__description {
        text-align: center;
      }

      &__image {
        margin-top: 2rem;
        width: 100%;
        border-radius: 0.5rem;
        aspect-ratio: 3 / 2;
        object-fit: cover;
      }
    }

    &__info {
      display: grid;
      grid-template-rows: auto auto;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-top: 2rem;

      h4 {
        margin-bottom: 0.25rem;
      }

      p {
        line-height: 1.2;
      }

      &__skills {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
    }

    &__content {
      & :global(h3) {
        margin-block-start: 5rem;
        margin-block-end: -1rem;
        text-align: center;
      }

      & :global(h4) {
        margin-block-start: 3rem;
        margin-block-end: 1rem;
      }

      & :global(p) {
        margin-block-start: 1rem;
        margin-block-end: 1rem;
      }

      & :global(ul),
      :global(ol) {
        margin-block-start: 1rem;
        margin-block-end: 1rem;
        padding-inline-start: 2rem;
      }
    }
  }
</style>
