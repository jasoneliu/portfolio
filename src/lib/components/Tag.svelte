<script lang="ts">
  import { colors, type Color } from '$lib/colors';

  export let text: string = '';
  export let color: Color = 'text';
</script>

<span
  class="tag"
  style:background-color={`${colors[color]}33`}
  style:border-color={colors[color]}
  style:color={colors[color]}
>
  {text}
</span>

<style lang="scss">
  .tag {
    border: 1px solid;
    border-radius: 2rem;
    padding: 0.5rem 0.7rem 0.3rem;
  }
</style>
