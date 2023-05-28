<script lang="ts">
  import Toc from '$lib/components/Toc.svelte';
  import ProjectPage from '$lib/components/ProjectPage.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  const project = data.project;
</script>

<Toc />
<main class="project">
  <ProjectPage {project}>
    <slot />
  </ProjectPage>
</main>

<style lang="scss">
  .project {
    display: block;
    margin-left: 5rem;
    width: 60%;
    padding: 0 1.5rem;

    @media screen and (max-width: $breakpoint-lg) {
      margin: 0;
      width: 80%;
    }

    @media screen and (max-width: $breakpoint-md) {
      margin: 0;
      width: 100%;
    }
  }
</style>
