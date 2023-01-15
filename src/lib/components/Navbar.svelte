<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { colors } from '$lib/colors';
  import { Hamburger } from 'svelte-hamburgers';

  // Navbar items
  const navItems: string[] = ['Home', 'Projects', 'Resume'];
  const resumeLink =
    'https://drive.google.com/file/d/1839WZa3DpYe1a5eQLdNsCkZ9U_Qb7Xe9/view?usp=sharing';
  let hoveredNavItem: string | null = null;

  // Screen width and mobile layout
  let innerWidth: number;
  let mobileLayout: boolean = false;
  $: mobileLayout = innerWidth <= 768; // $breakpoint-md

  // Hamburger menu for mobile layout
  let hamburgerOpen: boolean = false;
  let hamburgerAnimating: boolean = false;
  const hamburgerAnimationDurationMs: number = 750;

  // Show navbar items to trigger svelte transition in
  let showNavbarItems: boolean = true;
  $: showNavbarItems =
    animationReady && (!mobileLayout || hamburgerOpen || hamburgerAnimating);

  // Close hamburger menu after switching to desktop layout
  $: if (!mobileLayout && animationReady) {
    closeHamburger();
  }

  /** Update which navbar item is hovered. */
  function setHoveredNavItem(navItem: string | null) {
    hoveredNavItem = navItem;
  }

  /** Disable clicking on hamburger menu icon while it's animating. */
  function animateHamburger() {
    hamburgerAnimating = true;
    setTimeout(() => {
      hamburgerAnimating = false;
    }, hamburgerAnimationDurationMs);
  }

  /** Close hamburger menu. */
  function closeHamburger() {
    animateHamburger();
    hamburgerOpen = false;
    hoveredNavItem = null;
  }

  // Run svelte transitions on first render
  let animationReady: boolean = false;
  onMount(() => {
    animationReady = true;
  });
</script>

<!-- Bind screen width -->
<svelte:window bind:innerWidth />

<!-- Disable scrolling when hamburger menu is open -->
<svelte:head>
  {#if hamburgerOpen}
    <style lang="scss">
      body {
        overflow: hidden;
      }
    </style>
  {/if}
</svelte:head>

<nav class="navbar">
  <div class="navbar__hamburger" class:disabled={hamburgerAnimating}>
    <Hamburger
      bind:open={hamburgerOpen}
      type="spin"
      --color={colors.text}
      --padding="0.5rem"
      --layer-width="1.5rem"
      --layer-height="0.15rem"
      --layer-spacing="0.3rem"
      on:click={animateHamburger}
    />
  </div>
  <div
    class="navbar__wrapper"
    class:open={hamburgerOpen}
    style:transition-duration={`${hamburgerAnimationDurationMs}ms`}
  >
    {#if showNavbarItems}
      <ul class="navbar__list">
        {#each navItems as item, itemIndex}
          <li class="navbar__item">
            <a
              class="navbar__link"
              href={item === 'Resume' ? resumeLink : `/#${item.toLowerCase()}`}
              rel="noreferrer"
              target={item === 'Resume' ? '_blank' : null}
              on:click={closeHamburger}
            >
              <span
                class="navbar__text"
                class:hovered={hoveredNavItem && hoveredNavItem !== item}
                on:mouseenter={() => setHoveredNavItem(item)}
                on:mouseleave={() => setHoveredNavItem(null)}
                in:fly={mobileLayout
                  ? {
                      x: -200,
                      duration: 500,
                      delay: 200 + 50 * itemIndex,
                      easing: cubicOut,
                    }
                  : {
                      duration: 0,
                    }}
              >
                {item}
              </span>
            </a>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</nav>

<style lang="scss">
  .navbar {
    display: flex;
    position: fixed;
    justify-content: flex-end;
    z-index: 10;
    margin: 1rem 0;
    width: 100%;
    padding: 1rem;

    &__hamburger {
      display: none;
    }

    &__list {
      display: flex;
      flex-flow: row nowrap;
    }

    &__item {
      list-style: none;
    }

    &__link {
      text-decoration: none;
    }

    &__text {
      display: inline-block;
      transition: opacity 0.4s;
      padding: 0.25rem 0.75rem;
      color: $text;

      &.hovered {
        opacity: 0.4;
      }
    }

    @media screen and (max-width: $breakpoint-md) {
      &__hamburger {
        display: block;
        z-index: 10;
        margin-top: -0.25rem;
        margin-right: 1rem;
        width: 2rem;
        height: 2rem;

        &.disabled {
          pointer-events: none;
        }
      }

      &__wrapper {
        position: fixed;
        top: 0;
        right: 0;
        transition-property: width;
        transition-timing-function: $cubic-in-out;
        width: 0%;
        height: 100%;
        background-color: $crust;

        &.open {
          left: 0;
          width: 100%;
        }
      }

      &__list {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding: 0 10vw;
      }

      &__item {
        font-size: 8vw;

        &:not(:last-child) {
          border-bottom: 1px solid $surface2;
        }
      }

      &__text {
        margin: 0 -0.75rem;
        padding: 1rem;
      }
    }
  }
</style>
