<script lang="ts">
  import homeBackgroundImage from '$lib/assets/home-background.png';
  import IoMdArrowRoundDown from 'svelte-icons/io/IoMdArrowRoundDown.svelte';

  let scrollY: number;
</script>

<svelte:window bind:scrollY />

<section class="home" id="home">
  <div class="home__wrapper">
    <div
      class="home__info"
      style="transform: translate3d(0, {scrollY * -0.25}px, 0)"
    >
      <h1 class="home__name">Jason Liu</h1>
      <div class="home__about">
        <p>Full-stack web developer</p>
        <p>
          Studying computer science and mathematics at the University of
          Maryland
        </p>
      </div>
      <div class="home__scroll">
        <div class="home__scroll-icon">
          <IoMdArrowRoundDown />
        </div>
        <span class="home__scroll-text">SCROLL</span>
      </div>
    </div>
    <div class="home__background">
      <img
        class="home__background-image"
        src={homeBackgroundImage}
        alt="Home Background"
        draggable="false"
      />
    </div>
  </div>
</section>

<style lang="scss">
  .home {
    width: 100%;
    height: 100vh;
    padding: 20vh max(8vw, 2rem) 12vh;

    &__wrapper {
      display: flex;
      position: relative;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    &__info {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      gap: 3rem;
      padding: 0 2rem;
    }

    &__name {
      text-align: left;
      text-shadow: 0px 0.25rem 0.75rem rgba($crust, 0.3);
    }

    &__about {
      display: flex;
      flex-flow: column nowrap;
      gap: 0.75rem;
      max-width: 30rem;
    }

    &__scroll {
      display: flex;
      align-items: center;
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

    &__background {
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 1.5vh;
      z-index: -1;
    }

    &__background-image {
      width: 100%;
      height: 100%;
      border-radius: 1.5vh;
      box-shadow: 0.2rem 0.6rem 1.2rem rgba($crust, 0.6);
      object-fit: cover;
      object-position: 0% 100%;
      filter: brightness(90%) contrast(105%) saturate(90%) opacity(50%);
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
