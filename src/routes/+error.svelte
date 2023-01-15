<script lang="ts">
  import LinkButton from '$lib/components/LinkButton.svelte';
</script>

<svelte:head>
  <title>Oops — Jason Liu</title>
  <meta
    name="description"
    content="Portfolio and personal website of Jason Liu, a web developer and student at the University of Maryland."
  />
</svelte:head>

<div class="error">
  <h1 class="error__oops">Oops!</h1>
  <h3 class="error__message">The page you're looking for doesn't exist.</h3>
  <div class="error__button">
    <LinkButton text="Take me home" link="/" />
  </div>
</div>

<style lang="scss">
  .error {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: 1rem;
    width: 100%;
    height: 100%;
    padding: 2rem;
    text-align: center;

    &__button {
      margin-top: 2rem;
    }
  }
</style>
