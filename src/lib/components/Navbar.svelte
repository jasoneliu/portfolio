<script lang="ts">
  const items = ['Home', 'Projects'];
</script>

<nav class="navbar">
  <ul class="navbar__list">
    {#each items as item}
      <li class="navbar__item">
        <a class="navbar__link" href={`#${item.toLowerCase()}`}>
          <span class="navbar__text">{item}</span>
        </a>
      </li>
    {/each}
    <li class="navbar__item">
      <a
        class="navbar__link"
        href="https://drive.google.com/file/d/1839WZa3DpYe1a5eQLdNsCkZ9U_Qb7Xe9/view?usp=sharing"
        rel="noreferrer"
        target="_blank"
      >
        <span class="navbar__text">Resume</span>
      </a>
    </li>
  </ul>
</nav>

<style lang="scss">
  .navbar {
    display: flex;
    position: fixed;
    justify-content: flex-end;
    z-index: 10;
    width: 100%;
    padding: 1rem;

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
      transition: opacity 400ms;
      list-style: none;
    }

    &__link {
      display: flex;
      flex-flow: column nowrap;
      padding: 0 0.75rem;
      text-decoration: none;
    }

    &__text {
      color: $text;
    }
  }
</style>
