<script lang="ts">
  import IoMdArrowRoundDown from 'svelte-icons/io/IoMdArrowRoundDown.svelte';
</script>

<section class="home" id="home">
  <h1 class="home__name">Jason Liu</h1>
  <div class="home__about">
    <p>full-stack web developer</p>
    <p>
      studying computer science and mathematics and the University of Maryland
    </p>
  </div>
  <div class="home__scroll">
    <div class="home__scroll-icon">
      <IoMdArrowRoundDown />
    </div>
    <span class="home__scroll-text">SCROLL</span>
  </div>
</section>

<style lang="scss">
  .home {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;

    height: 100vh;
    padding: 0 2rem;
    text-align: center;

    &__name {
      margin-bottom: 0.5rem;
    }

    &__headline {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      column-gap: 0.75rem;
    }

    &__about {
      display: flex;
      flex-flow: column nowrap;
      gap: 0.5rem;
      margin-top: 3rem;
      max-width: 30rem;
    }

    &__scroll {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      overflow: hidden;
      color: $subtext1;
    }

    &__scroll-icon {
      width: 1rem;
      height: 1rem;
      animation: scrollIconLoop 3s ease infinite;
    }

    &__scroll-text {
      letter-spacing: 0.1rem;
    }
  }

  @keyframes scrollIconLoop {
    0% {
      transform: translateY(-120%);
    }

    30% {
      transform: translateY(0%);
    }

    70% {
      transform: translateY(0%);
    }

    100% {
      transform: translateY(120%);
    }
  }
</style>
