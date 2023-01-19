<script lang="ts">
  import IoIosMail from 'svelte-icons/io/IoIosMail.svelte';
  import IoLogoGithub from 'svelte-icons/io/IoLogoGithub.svelte';
  import IoLogoLinkedin from 'svelte-icons/io/IoLogoLinkedin.svelte';

  const year = new Date().getFullYear();
</script>

<footer class="footer">
  <p class="footer__text">Designed and developed with ♥</p>
  <div class="footer__icon-list">
    <a class="footer__icon" href="mailto:jasoneliu03@gmail.com">
      <IoIosMail />
    </a>
    <a
      class="footer__icon"
      href="https://github.com/jasoneliu"
      rel="noreferrer"
      target="_blank"
    >
      <IoLogoGithub />
    </a>
    <a
      class="footer__icon"
      href="https://www.linkedin.com/in/jasoneliu"
      rel="noreferrer"
      target="_blank"
    >
      <IoLogoLinkedin />
    </a>
  </div>
  <p class="footer__copyright">Jason Liu © {year}</p>
</footer>

<style lang="scss">
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 3rem;

    &__text {
      color: $subtext1;
      font-size: 0.875rem;
    }

    &__icon-list {
      display: flex;
      gap: 0.5rem;
    }

    &__icon {
      transition: opacity 300ms;
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
