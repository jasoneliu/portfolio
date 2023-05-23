<script lang="ts">
  import Bubbles from '$lib/components/bubbles/Bubbles.svelte';
  import InView from '$lib/components/InView.svelte';
  import {
    innerWidth,
    scrollY,
    pageLoading,
    pageTransitioning,
  } from '$lib/store';
  import IoMdArrowRoundDown from 'svelte-icons/io/IoMdArrowRoundDown.svelte';

  // Animation timing
  const nameDelayMs = 600;
  const headlineDelayMs = 900;
  const schoolDelayMs = 1300;
  const scrollDelayMs = 2200;
  const wordDelayMs = 100;

  // Start animation when done loading / transitioning
  let animationReady = false;
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
        <InView delay={nameDelayMs} inlineBlock overflowHidden>Jason</InView>
        <InView delay={nameDelayMs + wordDelayMs} inlineBlock overflowHidden>
          Liu
        </InView>
      </h1>
      <div class="home__about">
        <p>
          <InView delay={headlineDelayMs} inlineBlock overflowHidden>
            Full-stack
          </InView>
          <InView
            delay={headlineDelayMs + wordDelayMs}
            inlineBlock
            overflowHidden
          >
            web developer
          </InView>
        </p>
        <p>
          <InView delay={schoolDelayMs} inlineBlock overflowHidden
            >Studying</InView
          >
          <InView
            delay={schoolDelayMs + wordDelayMs}
            inlineBlock
            overflowHidden
          >
            computer science
          </InView>
          {#if $innerWidth <= 576}
            <br />
          {/if}
          <InView
            delay={schoolDelayMs + 2 * wordDelayMs}
            inlineBlock
            overflowHidden
          >
            and
          </InView>
          <InView
            delay={schoolDelayMs + 3 * wordDelayMs}
            inlineBlock
            overflowHidden
          >
            mathematics
          </InView>
          <InView
            delay={schoolDelayMs + 4 * wordDelayMs}
            inlineBlock
            overflowHidden
          >
            at
          </InView>
          <br />
          <InView
            delay={schoolDelayMs + 5 * wordDelayMs}
            inlineBlock
            overflowHidden
          >
            the University of Maryland
          </InView>
        </p>
      </div>
      <InView delay={scrollDelayMs} overflowHidden>
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
    margin-bottom: calc(10dvh + 13rem);
    width: 100%;
    height: calc(100dvh - 13rem);

    @media screen and (max-width: $breakpoint-md) {
      margin-bottom: calc(10dvh + 10rem);
      height: calc(100dvh - 10rem);
    }

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
