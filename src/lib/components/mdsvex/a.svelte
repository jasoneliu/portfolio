<script lang="ts">
  export let href: string;
  export let rel: string;
</script>

<a {href} {rel} target="_blank">
  <slot />
</a>

<style lang="scss">
  a {
    color: $lavender;
  }
</style>
