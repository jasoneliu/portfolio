<script lang="ts">
  import { page } from '$app/stores';
  import InView from '$lib/components/InView.svelte';
  import { socials } from '$lib/socials';

  const year = new Date().getFullYear();
</script>

<footer>
  <InView disabled={$page.url.pathname !== '/'}>
    <div class="footer__wrapper">
      <p class="footer__text">
        Designed and developed with <span class="heart">&#xe9da;</span>
      </p>
      <div class="footer__icon-list">
        {#each socials as social}
          <a class="footer__icon" href={social.href} target="_blank">
            <svelte:component this={social.icon} title={social.name} />
          </a>
        {/each}
      </div>
      <p class="footer__copyright">Jason Liu © {year}</p>
    </div>
  </InView>
</footer>

<style lang="scss">
  footer {
    overflow: hidden;
  }

  .footer {
    &__wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      padding: 3rem 0;
    }

    &__text {
      color: $subtext1;
      font-size: 0.875rem;

      & .heart {
        font-family: Icomoon;
        font-size: 0.75rem;
      }
    }

    &__icon-list {
      display: flex;
      gap: 0.5rem;
    }

    &__icon {
      transition: opacity 0.3s $ease-out-cubic;
      width: 2.5rem;
      height: 2.5rem;
      padding: 0.25rem;
      color: $text;

      @media screen and (min-width: $breakpoint-md) {
        &:hover {
          opacity: 0.5;
        }
      }
    }

    &__copyright {
      color: $subtext0;
      font-size: 0.75rem;
    }
  }
</style>
