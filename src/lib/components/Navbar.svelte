<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { cubicIn, cubicOut, cubicInOut } from 'svelte/easing';
  import { beforeNavigate } from '$app/navigation';
  import logo from '$lib/assets/logo.svg';
  import { colors } from '$lib/colors';
  import { socials } from '$lib/socials';
  import { url, hashScrolling } from '$lib/store';
  import { slide, slideHorizontal } from '$lib/transition';
  import { Hamburger } from 'svelte-hamburgers';

  // Navbar items
  const navItems: string[] = ['Home', 'Projects', 'Resume'];
  let hoveredNavItem: string | null = null;

  // Screen width and mobile layout
  let innerWidth: number;
  let mobileLayout: boolean = false;
  $: mobileLayout = innerWidth < 768; // $breakpoint-md

  // Scroll position
  let scrollY: number;
  let prevScrollY: number;

  // Hide navbar when scrolling down
  let showNavbar: boolean = true;
  $: showNavbar =
    !isScrollingDown(scrollY) || $hashScrolling > 0 || mobileLayout;

  // Hamburger menu for mobile layout
  let hamburgerOpen: boolean = false;
  let hamburgerAnimating: boolean = false;
  const hamburgerAnimationDurationMs: number = 500;

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

  // Close hamburger before navigating
  beforeNavigate(() => {
    closeHamburger();
  });

  // Run svelte transitions on first render
  let animationReady: boolean = false;
  onMount(() => {
    animationReady = true;
  });
</script>

<!-- Bind screen width and scroll position -->
<svelte:window bind:innerWidth bind:scrollY />

<header>
  <nav class="navbar" class:hide={!showNavbar}>
    <a class="navbar__icon" href="/" on:click={removeUrlHash}>
      <img class="navbar__icon-image" src={logo} alt="Icon" />
    </a>
    {#key hamburgerOpen}
      <div
        class="navbar__wrapper"
        class:open={hamburgerOpen}
        transition:slide={mobileLayout
          ? { duration: hamburgerAnimationDurationMs, easing: cubicOut }
          : { duration: 0 }}
      >
        {#if showNavbarItems}
          <div class="navbar__content-wrapper">
            <ul class="navbar__content">
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
                      if (navItem === 'Home') {
                        removeUrlHash();
                      }
                    }}
                  >
                    <span
                      class="navbar__text"
                      class:hovered={hoveredNavItem &&
                        hoveredNavItem !== navItem}
                      on:mouseenter={() => setHoveredNavItem(navItem)}
                      on:mouseleave={() => setHoveredNavItem(null)}
                      in:fly={mobileLayout
                        ? {
                            y: -20,
                            duration: 500,
                            delay: 200 + 100 * navItemIndex,
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
            {#if mobileLayout}
              <div
                class="navbar__mobile-separator"
                in:slideHorizontal={{
                  duration: 500,
                  delay: 500,
                  easing: cubicOut,
                }}
              />
              <div class="navbar__mobile-content">
                {#each socials as social, socialIndex}
                  <div
                    class="navbar__link-wrapper"
                    in:fade={{
                      duration: 500,
                      delay: 500 + 100 * socialIndex,
                      easing: cubicOut,
                    }}
                  >
                    <a
                      class="navbar__link"
                      href={social.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <span class="navbar__social-text">{social.name}</span>
                    </a>
                  </div>
                {/each}
              </div>
            {/if}
          </div>
        {/if}
      </div>
    {/key}
    {#if mobileLayout}
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
      <div class="navbar__background" />
    {/if}
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
    height: 4.5rem;
    padding: 1rem;
    pointer-events: none;

    &.hide {
      transform: translate3d(0, -100%, 0);
    }

    &__icon {
      z-index: 10;
      margin-left: 0.25rem;
      padding: 0.5rem;
      pointer-events: auto;
    }

    &__icon-image {
      width: 3rem;
    }

    &__content {
      display: flex;
      flex-direction: row;
    }

    &__item {
      list-style: none;
    }

    &__link {
      text-decoration: none;
      color: $text;
      pointer-events: auto;
    }

    &__text {
      display: inline-block;
      transition: opacity 0.3s;
      padding: 0.25rem 0.75rem;

      &.hovered {
        opacity: 0.4;
      }
    }
  }

  @media screen and (max-width: $breakpoint-md) {
    .navbar {
      margin-top: 0;
      pointer-events: auto;

      &__wrapper {
        position: fixed;
        top: 4.5rem;
        right: 0;
        width: 100%;
        height: 0;
        background-color: $mantle;

        &.open {
          height: 16.5rem;
        }
      }

      &__content-wrapper {
        display: flex;
        position: absolute;
        bottom: 0;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 16.5rem;
        padding: 0.5rem 2rem;
      }

      &__content {
        display: flex;
        flex-direction: column;
        margin-bottom: 0.5rem;
      }

      &__text {
        width: 100%;
        padding: 0.5rem;
        text-align: center;
        font-size: 2rem;

        &.hovered {
          opacity: 1;
        }
      }

      &__mobile-separator {
        width: 100%;
        height: 1px;
        background-color: $text;
      }

      &__mobile-content {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        margin: 1rem -0.5rem;
      }

      &__link-wrapper {
        &:nth-child(1) {
          text-align: left;
        }
        &:nth-child(2) {
          text-align: center;
        }
        &:nth-child(3) {
          text-align: right;
        }
      }

      &__social-text {
        padding: 0.5rem;
        font-size: 1rem;
      }

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

      &__background {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 5;
        width: 100%;
        height: 4.5rem;
        box-shadow: 0 0 0.75rem $crust;
        background-color: $base;
      }
    }
  }
</style>
