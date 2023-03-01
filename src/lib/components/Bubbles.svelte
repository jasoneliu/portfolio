<script lang="ts">
  import BubblesScene from '$lib/components/BubblesScene.svelte';
  import * as THREE from 'three';
  import { Canvas } from '@threlte/core';
</script>

<div class="bubbles">
  <Canvas shadowMapType={THREE.PCFShadowMap}>
    <BubblesScene />
  </Canvas>
</div>

<style lang="scss">
  .bubbles {
    position: fixed;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
  }
</style>
