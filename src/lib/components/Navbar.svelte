<script lang="ts">
  import { onMount } from 'svelte';
  import { cubicOut } from 'svelte/easing';
  import { fade, fly } from 'svelte/transition';
  import { beforeNavigate } from '$app/navigation';
  import logo from '$lib/assets/logo.svg';
  import { colors } from '$lib/colors';
  import { socials } from '$lib/socials';
  import { scrollY, mobileLayout, url, hashScrolling } from '$lib/store';
  import { slide } from '$lib/transition';
  import { Hamburger } from 'svelte-hamburgers';

  // Navbar items
  const navItems: string[] = ['Home', 'Projects', 'Resume'];

  // Scroll position
  let prevScrollY: number | undefined;

  // Detect whether the user is scrolling down
  let isScrollingDown = false;
  $: isScrollingDown = getIsScrollingDown($scrollY);

  // Hide navbar when scrolling down
  let showNavbar = true;
  $: showNavbar = !isScrollingDown || $hashScrolling > 0 || $mobileLayout;

  // Hamburger menu for mobile layout
  let hamburgerOpen = false;
  let hamburgerAnimating = false;
  const hamburgerAnimationDurationMs = 500;

  // Show navbar items to trigger svelte transition in
  let showNavbarItems = true;
  $: showNavbarItems =
    animationReady && (!$mobileLayout || hamburgerOpen || hamburgerAnimating);

  // Close hamburger menu after switching to desktop layout
  $: if (!$mobileLayout && animationReady) {
    closeHamburger();
  }

  // Update body background color for overscroll
  $: updateBodyBackgroundColor(isScrollingDown);

  /** Update URL hash on navigation. */
  function setUrlHash(navItem: string) {
    if (navItem === 'Home') {
      url.set({ ...url, hash: '' });
    } else if (navItem === 'Projects') {
      url.set({ ...url, hash: '#projects' });
    }
  }

  /** Detect whether the user is scrolling down. */
  function getIsScrollingDown(scrollY: number) {
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
  }

  /** Update body background color based on scroll direction. */
  function updateBodyBackgroundColor(isScrollingDown: boolean) {
    if (!animationReady) {
      return;
    }
    const backgroundColor = isScrollingDown ? colors.base : colors.crust;
    document.body.style.backgroundColor = backgroundColor;
  }

  // Close hamburger before navigating
  beforeNavigate(() => {
    closeHamburger();
  });

  // Run svelte transitions on first render
  let animationReady = false;
  onMount(() => {
    animationReady = true;
  });
</script>

<header>
  <nav class="navbar" class:hide={!showNavbar}>
    <a
      class="navbar__icon"
      href="/"
      on:click={(event) => {
        if (!event.ctrlKey) {
          setUrlHash('Home');
        }
      }}
    >
      <img class="navbar__icon-image" src={logo} alt="Icon" />
    </a>
    {#key hamburgerOpen}
      <div
        class="navbar__wrapper"
        class:open={hamburgerOpen}
        in:slide={$mobileLayout
          ? { duration: hamburgerAnimationDurationMs, easing: cubicOut }
          : { duration: 0 }}
        out:slide={$mobileLayout
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
                    target={navItem === 'Resume' ? '_blank' : null}
                    on:click={(event) => {
                      if (!event.ctrlKey) {
                        closeHamburger();
                        setUrlHash(navItem);
                      }
                    }}
                  >
                    <span
                      class="navbar__text"
                      in:fly|global={$mobileLayout
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
            {#if $mobileLayout}
              <div
                class="navbar__mobile-separator"
                in:slide|global={{
                  duration: 500,
                  delay: 500,
                  easing: cubicOut,
                  axis: 'x',
                }}
              />
              <div class="navbar__mobile-content">
                {#each socials as social, socialIndex}
                  <div
                    class="navbar__link-wrapper"
                    in:fade|global={{
                      duration: 500,
                      delay: 500 + 100 * socialIndex,
                      easing: cubicOut,
                    }}
                  >
                    <a class="navbar__link" href={social.href} target="_blank">
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
    {#if $mobileLayout}
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
      height: 2rem;
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
      margin: 0 0.25rem;
    }

    &__text {
      display: inline-block;
      position: relative;
      padding: 0.5rem;

      &::after {
        content: '';
        position: absolute;
        left: 0.5rem;
        right: 100%;
        bottom: 0;
        transition: right 0.3s $ease-in-out-quad;
        margin-top: 0rem;
        height: 1px;
        background-color: $text;
      }

      &:hover {
        &::after {
          right: 0.5rem;
        }
      }
    }
  }

  @media screen and (max-width: $breakpoint-md) {
    .navbar {
      margin-top: 0;
      pointer-events: auto;

      &__icon {
        margin-left: 0;
      }

      &__wrapper {
        position: fixed;
        top: 4.5rem;
        right: 0;
        width: 100%;
        height: 0;
        box-shadow: 0 0 0.75rem $crust;
        background-color: $mantle;

        &.open {
          height: 15.5rem;
        }
      }

      &__content-wrapper {
        display: flex;
        position: absolute;
        bottom: 0;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 15.5rem;
        padding: 0.5rem 2rem;
      }

      &__content {
        display: flex;
        flex-direction: column;
        margin-bottom: 0.5rem;
      }

      &__link {
        margin: 0;
      }

      &__text {
        width: 100%;
        text-align: center;
        font-size: 1.75rem;

        &::after {
          display: none;
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
        margin: 1rem -0.5rem 0.875rem;
      }

      &__link-wrapper {
        text-align: center;
        &:first-child {
          text-align: left;
        }
        &:last-child {
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
        margin-right: 0.25rem;
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
