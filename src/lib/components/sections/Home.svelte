<script lang="ts">
  import Bubbles from '$lib/components/bubbles/Bubbles.svelte';
  import { scrollY } from '$lib/store';
  import IoMdArrowRoundDown from 'svelte-icons/io/IoMdArrowRoundDown.svelte';
</script>

<section class="home" style:opacity={(750 - $scrollY) / 750}>
  <div
    class="home__info"
    style:transform={`translate3d(0, ${$scrollY * 0.5}px, 0)`}
  >
    <h1 class="home__name">Jason Liu</h1>
    <div class="home__about">
      <p>Full-stack web developer</p>
      <p>
        Studying computer science and mathematics at
        <br />
        the University of Maryland
      </p>
    </div>
    <div class="home__scroll">
      <div class="home__scroll-icon">
        <IoMdArrowRoundDown />
      </div>
      <span class="home__scroll-text">SCROLL</span>
    </div>
  </div>
  <Bubbles />
</section>

<style lang="scss">
  .home {
    width: 100%;
    height: 110vh;

    &__info {
      display: flex;
      position: relative;
      flex-direction: column;
      justify-content: center;
      gap: 3rem;
      z-index: 5;
      padding: 4rem 2rem 0;
    }

    &__name {
      text-align: center;
      text-shadow: 0px 0.25rem 0.75rem rgba($crust, 0.3);
    }

    &__about {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      text-align: center;
    }

    &__scroll {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 3rem;
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
