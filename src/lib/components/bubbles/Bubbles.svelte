<script lang="ts">
  import BubblesCamera from '$lib/components/bubbles/BubblesCamera.svelte';
  import BubblesMeshes from '$lib/components/bubbles/BubblesMeshes.svelte';
  import { PCFShadowMap } from 'three';
  import { Canvas, T } from '@threlte/core';

  // Scene is visible when $scrollY <= maxScrollY
  const maxScrollY = 850;
</script>

<div class="bubbles">
  <Canvas shadows={PCFShadowMap}>
    <!-- Camera -->
    <BubblesCamera {maxScrollY} />

    <!-- Helpers -->
    <!-- <T.AxesHelper args={[250]} />
    <T.GridHelper args={[500, 10]} /> -->

    <!-- Lights and shadows -->
    <T.AmbientLight intensity={0.5} />
    <T.DirectionalLight
      intensity={1}
      position={[0, 1, 0]}
      shadow.mapSize={[4096, 4096]}
      shadow.radius={16}
      castShadow
    >
      <T.OrthographicCamera
        attach="shadow.camera"
        left={-100}
        right={100}
        bottom={-100}
        top={100}
        near={-1000}
        far={5000}
      />
    </T.DirectionalLight>

    <!-- Bubbles -->
    <BubblesMeshes {maxScrollY} />
  </Canvas>
</div>

<style lang="scss">
  .bubbles {
    position: fixed;
    top: 0;

    // Prevent flickering on window resize
    width: max(100%, 100rem);
    height: 100vh;
  }
</style>
