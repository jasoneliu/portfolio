<script lang="ts">
  export let items: string[] = [];
</script>

<nav class="navbar">
  <ul class="navbar__list">
    {#each items as item, itemIndex}
      <li class="navbar__item">
        <a class="navbar__link" href={`#${item}`}>
          <div class="navbar__number mono">{`0${itemIndex + 1}`}</div>
          <div class="navbar__text">{item}</div>
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style lang="scss">
  @import '$lib/colors/colors.module.scss';

  .navbar {
    display: flex;
    justify-content: center;

    &__list {
      display: flex;
      flex-flow: row nowrap;
      margin: 1rem 0;
      padding: 0;

      &:hover > .navbar__item:not(:hover) {
        opacity: 0.5;
      }
    }

    &__item {
      list-style: none;
      transition: opacity 500ms;
    }

    &__link {
      display: block;
      padding: 0 0.75rem;
      text-decoration: none;
    }

    &__number {
      font-size: 0.75rem;
      text-align: right;
    }

    &__text {
      color: $text;
    }
  }
</style>
