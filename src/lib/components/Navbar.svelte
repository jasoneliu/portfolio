<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import logo from '$lib/assets/logo.svg';
  import { colors } from '$lib/colors';
  import { Hamburger } from 'svelte-hamburgers';
  import { url } from '$lib/store';

  // Navbar items
  const navItems: string[] = ['Home', 'Projects', 'Resume'];
  let hoveredNavItem: string | null = null;
  let navigating: number = 0;

  // Screen width and mobile layout
  let innerWidth: number;
  let mobileLayout: boolean = false;
  $: mobileLayout = innerWidth <= 768; // $breakpoint-md

  // Scroll position
  let scrollY: number;
  let prevScrollY: number;

  // Hide navbar when scrolling down
  let showNavbar: boolean = true;
  $: showNavbar = !isScrollingDown(scrollY) || navigating > 0 || mobileLayout;

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

  /** Remove URL hash for navigation to /. */
  function removeUrlHash() {
    url.set({ ...url, hash: '' });
  }

  /** Begin navigation to prevent navbar from hiding. */
  function beginNavigation() {
    navigating++;
    setTimeout(() => {
      navigating--;
    }, 750);
  }

  /** Detect whether the user is scrolling down. */
  function isScrollingDown(scrollY: number) {
    // Not scrolling down on first render
    if (!prevScrollY) {
      prevScrollY = scrollY;
      return false;
    }

    // Set previous scroll position and detect if scrolling down
    const scrollDistance = scrollY - prevScrollY;
    prevScrollY = scrollY;
    return scrollDistance > 0;
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

<!-- Bind screen width and scroll position -->
<svelte:window bind:innerWidth bind:scrollY />

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

<header>
  <nav class="navbar" class:hide={!showNavbar}>
    <a class="navbar__icon" href="/" on:click={removeUrlHash}>
      <img class="navbar__icon-image" src={logo} alt="Icon" />
    </a>
    <div class="navbar__hamburger" class:disabled={hamburgerAnimating}>
      <Hamburger
        bind:open={hamburgerOpen}
        type="spin"
        --color={colors.text}
        --padding="0.5rem"
        --layer-width="1.5rem"
        --layer-height="0.15rem"
        --layer-spacing="0.3rem"
        --hover-opacity="1"
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
          {#each navItems as navItem, navItemIndex}
            <li class="navbar__item">
              <a
                class="navbar__link"
                href={navItem === 'Home'
                  ? '/'
                  : navItem === 'Resume'
                  ? '/resume'
                  : `/#${navItem.toLowerCase()}`}
                rel="noreferrer"
                target={navItem === 'Resume' ? '_blank' : null}
                on:click={() => {
                  closeHamburger();
                  beginNavigation();
                  if (navItem === 'Home') {
                    removeUrlHash();
                  }
                }}
              >
                <span
                  class="navbar__text"
                  class:hovered={hoveredNavItem && hoveredNavItem !== navItem}
                  on:mouseenter={() => setHoveredNavItem(navItem)}
                  on:mouseleave={() => setHoveredNavItem(null)}
                  in:fly={mobileLayout
                    ? {
                        x: -200,
                        duration: 500,
                        delay: 200 + 50 * navItemIndex,
                        easing: cubicOut,
                      }
                    : {
                        duration: 0,
                      }}
                >
                  {navItem}
                </span>
              </a>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </nav>
</header>

<style lang="scss">
  .navbar {
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: space-between;
    transition: transform 0.5s $ease-in-out-quad;
    z-index: 10;
    margin: 1rem 0;
    width: 100vw;
    padding: 1rem;
    pointer-events: none;

    &.hide {
      transform: translate3d(0, -100%, 0);
    }

    &__icon {
      margin-left: 0.25rem;
      padding: 0.5rem;
      pointer-events: auto;
    }

    &__icon-image {
      width: 3rem;
    }

    &__hamburger {
      display: none;
    }

    &__list {
      display: flex;
      flex-direction: row;
    }

    &__item {
      list-style: none;
    }

    &__link {
      text-decoration: none;
      pointer-events: auto;
    }

    &__text {
      display: inline-block;
      transition: opacity 0.3s;
      padding: 0.25rem 0.75rem;
      color: $text;

      &.hovered {
        opacity: 0.4;
      }
    }
  }

  @media screen and (max-width: $breakpoint-md) {
    .navbar {
      margin-top: 0;
      background-color: $base;
      box-shadow: 0 0 0.75rem $crust;
      pointer-events: auto;

      &__hamburger {
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        margin-right: 0.5rem;
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
        transition-timing-function: $ease-in-out-cubic;
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
        flex-direction: column;
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
