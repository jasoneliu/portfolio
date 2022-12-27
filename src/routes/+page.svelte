<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import HomeSection from '$lib/components/HomeSection.svelte';
  import ProjectsSection from '$lib/components/ProjectsSection.svelte';

  const navbarItems = ['home', 'projects'];
</script>

<div class="page">
  <Navbar items={navbarItems} />
  <HomeSection />
  <ProjectsSection />
</div>

<style lang="scss">
  .page {
    display: flex;
    flex-flow: column nowrap;
    gap: 2rem;
  }
</style>
