<script lang="ts">
  import ProjectList from '$lib/components/ProjectList.svelte';
  import { projects } from '$lib/projects';
</script>

<div class="page">
  <section class="section">
    <h1>Jason Liu</h1>
    <h5 class="mono">Software Engineer, Full Stack Developer</h5>
  </section>
  <section class="section">
    <h2 class="section__header">Projects</h2>
    <ProjectList {projects} />
  </section>
</div>

<style lang="scss">
  .page {
    display: flex;
    flex-flow: column nowrap;
    gap: 2rem;
    padding: 2rem 0;
  }

  .section {
    padding: 0 2rem;

    &__header {
      margin-bottom: 1rem;
      text-align: center;
    }
  }
</style>
