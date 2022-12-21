<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import ProjectList from '$lib/components/ProjectList.svelte';
  import { projects } from '$lib/projects';

  const navbarItems = ['home', 'projects'];
</script>

<div class="page">
  <Navbar items={navbarItems} />
  <section class="section home" id="home">
    <h1 class="home__name">Jason Liu</h1>
    <h4 class="home__headline mono">Software Engineer, Full Stack Developer</h4>
    <div class="home__about">
      <p>
        Hello! I’m a junior studying Computer Science and Mathematics at the
        University of Maryland.
      </p>
      <p>I work primarily with Node.js, TypeScript, React, and AWS.</p>
    </div>
  </section>
  <section class="projects" id="projects">
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
    h2 {
      margin-bottom: 1rem;
      text-align: center;
    }
  }

  .home {
    display: flex;
    flex-flow: column nowrap;
    height: 100vh;
    justify-content: center;
    text-align: center;

    &__name {
      margin-bottom: -1rem;
    }

    &__about {
      display: flex;
      flex-flow: column nowrap;
      gap: 0.5rem;
      margin-top: 3rem;
    }
  }
</style>
