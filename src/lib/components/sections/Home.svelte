<script lang="ts">
  import Bubbles from '$lib/components/bubbles/Bubbles.svelte';
  import InView from '$lib/components/InView.svelte';
  import { scrollY, pageLoading, pageTransitioning } from '$lib/store';
  import IoMdArrowRoundDown from 'svelte-icons/io/IoMdArrowRoundDown.svelte';

  // Animation timing
  const nameDelayMs: number = 600;
  const headlineDelayMs: number = 900;
  const schoolDelayMs: number = 1300;
  const scrollDelayMs: number = 2200;
  const wordDelayMs: number = 100;

  // Start animation when done loading / transitioning
  let animationReady: boolean = false;
  $: if (!$pageLoading && !$pageTransitioning) {
    animationReady = true;
  }
</script>

<section class="home">
  {#if animationReady}
    <div
      class="home__info"
      style:opacity={(700 - $scrollY) / 700}
      style:transform={`translate3d(0, ${Math.min(
        $scrollY * 0.5,
        700 * 0.5
      )}px, 0)`}
    >
      <h1 class="home__name">
        <InView delay={nameDelayMs} inline overflowHidden>
          <span>Jason</span>
        </InView>
        <InView delay={nameDelayMs + wordDelayMs} inline overflowHidden>
          <span> Liu</span>
        </InView>
      </h1>
      <div class="home__about">
        <p>
          <InView delay={headlineDelayMs} inline overflowHidden>
            Full-stack
          </InView>
          <InView delay={headlineDelayMs + wordDelayMs} inline overflowHidden>
            web developer
          </InView>
        </p>
        <p>
          <InView delay={schoolDelayMs} inline overflowHidden>Studying</InView>
          <InView delay={schoolDelayMs + wordDelayMs} inline overflowHidden>
            computer science
          </InView>
          <InView delay={schoolDelayMs + 2 * wordDelayMs} inline overflowHidden>
            and
          </InView>
          <InView delay={schoolDelayMs + 3 * wordDelayMs} inline overflowHidden>
            mathematics
          </InView>
          <InView delay={schoolDelayMs + 4 * wordDelayMs} inline overflowHidden>
            at
          </InView>
          <br />
          <InView delay={schoolDelayMs + 5 * wordDelayMs} inline overflowHidden>
            the University of Maryland
          </InView>
        </p>
      </div>
      <InView delay={scrollDelayMs} inline overflowHidden>
        <div class="home__scroll">
          <span class="home__scroll-text">SCROLL</span>
          <div class="home__scroll-icon">
            <IoMdArrowRoundDown />
          </div>
        </div>
      </InView>
    </div>
  {/if}
  <Bubbles />
</section>

<style lang="scss">
  .home {
    display: flex;
    justify-content: center;
    width: 100%;
    height: calc(100vh - 16rem);
    margin-bottom: calc(10vh + 16rem);

    &__info {
      display: flex;
      position: relative;
      flex-direction: column;
      justify-content: center;
      gap: 3rem;
      z-index: 5;
      padding: 0 2rem;
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
      margin-top: 2rem;
      overflow: hidden;
      color: $subtext1;
    }

    &__scroll-icon {
      width: 1rem;
      height: 1rem;
      animation: scrollIconLoop 3s ease infinite;
      animation-delay: 1s;
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
