<script lang="ts">
  import TagComponent from '$lib/components/Tag.svelte';
  import type { Tag } from '$lib/tags';

  export let tags: Tag[];
</script>

<div class="tags">
  {#each tags as tag}
    <TagComponent text={tag.text} color={tag.color} />
  {/each}
</div>

<style lang="scss">
  .tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
</style>
