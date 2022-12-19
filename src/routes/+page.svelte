<script lang="ts">
  import ProjectList from '$lib/components/ProjectList.svelte';
  import { projects } from '$lib/projects';
</script>

<section class="section">
  <h2 class="section__header">Projects</h2>
  <ProjectList {projects} />
</section>

<style lang="scss">
  .section {
    padding: 0 2rem;

    &__header {
      margin-bottom: 1rem;
      text-align: center;
    }
  }
</style>
