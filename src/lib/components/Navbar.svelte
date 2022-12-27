<script lang="ts">
  export let items: string[];
</script>

<nav class="navbar">
  <ul class="navbar__list">
    {#each items as item, itemIndex}
      <li class="navbar__item">
        <a class="navbar__link" href={`#${item}`}>
          <span class="navbar__number mono">{`0${itemIndex + 1}`}</span>
          <span class="navbar__text">{item}</span>
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style lang="scss">
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
      transition: opacity 400ms;
    }

    &__link {
      display: flex;
      flex-flow: column nowrap;
      padding: 0 0.75rem;
      text-decoration: none;
    }

    &__number {
      font-size: 0.875rem;
      text-align: right;
    }

    &__text {
      color: $text;
    }
  }
</style>
