<script lang="ts">
  import ProjectThumbnail from '$lib/components/ProjectThumbnail.svelte';
  import TagList from '$lib/components/TagList.svelte';
  import type { Project } from '$lib/projects';

  export let project: Project;

  // Project title and description for meta tags
  const headProjectTitle: string = project.head?.title ?? project.name;
  const headProjectDescription: string =
    project.head?.description ?? `${headProjectTitle}: ${project.description}`;
</script>

<svelte:head>
  <title>{headProjectTitle} — Jason Liu</title>
  <meta name="description" content={headProjectDescription} />
  <meta property="og:title" content="{headProjectTitle} — Jason Liu" />
  <meta property="og:description" content={headProjectDescription} />
</svelte:head>

<div class="project__head">
  <h2 class="project__head__title">{project.name}</h2>
  <p class="project__head__description">{project.description}</p>
  <div class="project__head__image">
    <ProjectThumbnail image={project.image} alt={project.name} />
  </div>
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
        margin-bottom: 0.5rem;
        text-align: center;
      }

      &__description {
        text-align: center;
      }

      &__image {
        margin: 2rem 0;
      }
    }

    &__info {
      display: grid;
      grid-template-rows: auto auto;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;

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

      & :global(strong) {
        font-weight: 700;
      }

      & :global(code) {
        padding: 0.1rem 0.3rem 0.15rem;
        border-radius: 0.25rem;
        background-color: rgba($lavender, 0.3);
        font-family: Iosevka, monospace;
        font-size: 0.875rem;
      }
    }
  }
</style>
