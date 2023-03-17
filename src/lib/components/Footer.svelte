<script lang="ts">
  import InView from '$lib/components/InView.svelte';
  import { socials } from '$lib/socials';

  const year = new Date().getFullYear();
</script>

<footer>
  <InView>
    <div class="footer">
      <p class="footer__text">Designed and developed with ♥</p>
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
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 3rem 0;

    &__text {
      color: $subtext1;
      font-size: 0.875rem;
    }

    &__icon-list {
      display: flex;
      gap: 0.5rem;
    }

    &__icon {
      transition: opacity 0.3s;
      width: 2.5rem;
      height: 2.5rem;
      padding: 0.25rem;
      color: $text;

      &:hover {
        opacity: 0.5;
      }
    }

    &__copyright {
      color: $subtext0;
      font-size: 0.75rem;
    }
  }
</style>
