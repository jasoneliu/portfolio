<script lang="ts">
  import { page } from '$app/stores';
  import { colors } from '$lib/colors';
  import InView from '$lib/components/InView.svelte';
  import type { ProjectSlug } from '$lib/projects';

  /** Return the url's slug. */
  function getSlug(url: URL) {
    const pathSegments = url.pathname.split('/');
    const slug = pathSegments[pathSegments.length - 1];
    return slug;
  }

  // Project text highlight color
  const slug = getSlug($page.url);
  const highlightColor = colors[slug as ProjectSlug];
</script>

<InView rootMargin="10% 0px -10%" inline disabled let:inView>
  <mark class:in-view={inView} style="--highlight-color: {highlightColor}">
    <slot />
  </mark>
</InView>

<style lang="scss">
  mark {
    transition: background-position 1s $ease-out-cubic;
    margin: 0 -0.125rem;
    padding: 0 0.125rem;
    background-color: transparent;
    background-image: linear-gradient(
      to right,
      transparent 50%,
      var(--highlight-color) 50%
    );
    background-position: 0% 100%;
    background-size: 200%;
    color: $text;

    &.in-view {
      background-position: -100% 100%;
    }
  }
</style>
