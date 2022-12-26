<script lang="ts">
  import { colors, type Color } from '$lib/colors';

  export let text: string;
  export let color: Color = 'text';

  const backgroundColorAlpha = 0.1;
  const backgroundColorAlphaHex = Math.round(
    backgroundColorAlpha * 255
  ).toString(16);
</script>

<span
  class="tag"
  style:background-color={`${colors[color]}${backgroundColorAlphaHex}`}
  style:border-color={colors[color]}
  style:color={colors[color]}
>
  {text}
</span>

<style lang="scss">
  .tag {
    border: 1px solid;
    border-radius: 2rem;
    font-size: 1rem;
    padding: 0.25rem 0.7rem 0.3rem;
  }
</style>
