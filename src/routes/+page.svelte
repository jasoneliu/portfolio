<script lang="ts">
  import ProjectList from '$lib/components/ProjectList.svelte';
  import { projects } from '$lib/projects';
</script>

<div class="page">
  <section class="section intro">
    <h1 class="intro__header">Jason Liu</h1>
    <h4 class="mono">Software Engineer, Full Stack Developer</h4>
    <div class="intro__info">
      <p>
        Hello! I’m a junior studying Computer Science and Mathematics at the
        University of Maryland.
      </p>
      <p>I work primarily with Node.js, TypeScript, React, and AWS.</p>
    </div>
  </section>
  <section class="projects">
    <h2>Projects</h2>
    <ProjectList {projects} />
  </section>
</div>

<style lang="scss">
  .page {
    display: flex;
    flex-flow: column nowrap;
    gap: 2rem;
  }

  section {
    padding: 0 2rem;

    h2 {
      margin-bottom: 1rem;
      text-align: center;
    }
  }

  .intro {
    display: flex;
    flex-flow: column nowrap;
    height: 100vh;
    justify-content: center;
    text-align: center;

    &__header {
      margin-bottom: -1rem;
    }

    &__info {
      display: flex;
      flex-flow: column nowrap;
      gap: 0.5rem;
      margin-top: 3rem;
    }
  }
</style>
