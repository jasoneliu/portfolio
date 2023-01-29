<script lang="ts">
  import { colors, type Color } from '$lib/colors';
  import IoIosArrowRoundForward from 'svelte-icons/io/IoIosArrowRoundForward.svelte';

  export let text: string;
  export let link: string;
  export let color: Color = 'lavender';
</script>

<a
  class="link-button"
  href={link}
  style:border-color={colors[color]}
  style:color={colors[color]}
>
  <span class="link-button__text">{text}</span>
  <div class="link-button__icon" style:color={colors[color]}>
    <IoIosArrowRoundForward />
  </div>
</a>

<style lang="scss">
  .link-button {
    display: flex;
    align-items: center;
    justify-content: center;

    transition: opacity 0.3s;

    width: fit-content;
    border: 1px solid;
    border-radius: 2rem;
    padding: 0.5rem 0.7rem;

    text-decoration: none;

    &:hover {
      opacity: 0.5;
    }

    &__icon {
      margin: -1rem 0;
      margin-right: -0.25rem;
      width: 2rem;
      height: 2rem;
    }
  }
</style>
