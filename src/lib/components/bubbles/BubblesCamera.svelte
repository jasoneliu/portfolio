<script lang="ts">
  import { quintOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';
  import { innerWidth, scrollY } from '$lib/store';
  import { Vector3 } from 'three';
  import { mapLinear } from 'three/src/math/MathUtils';
  import { T, TransformableObject, useThrelte } from '@threlte/core';
  import { onMount } from 'svelte';

  // Camera animation
  const cameraAnimationDurationMs: number = 3000;
  const cameraAnimationEasing = quintOut;

  // Camera rotation and zoom
  let cameraRotationX = tweened<number>(0, {
    duration: cameraAnimationDurationMs,
    easing: cameraAnimationEasing,
  });
  let cameraRotationY = tweened<number>(0, {
    duration: cameraAnimationDurationMs,
    easing: cameraAnimationEasing,
  });
  let cameraZoom: number = 1;

  // Update camera on scroll
  $: $scrollY, handleScroll();

  /** Update camera on scroll. */
  function handleScroll() {
    if (cameraReady) {
      cameraZoom = (750 - $scrollY) / 750;
      cameraRotationX.set(-$scrollY / 500);
      cameraRotationY.set(-$scrollY / 500);
    }
  }

  /** Update camera on mouse move. */
  function handleMouseMove(event: MouseEvent) {
    // $breakpoint-sm
    if ($innerWidth >= 576) {
      cameraRotationX.set(
        mapLinear(1 - event.clientY / window.innerHeight, 0, 1, -0.5, 0.5)
      );
      cameraRotationY.set(
        mapLinear(event.clientX / window.innerWidth, 0, 1, -0.5, 0.5)
      );
    }
  }

  // Renderer for OrbitControls
  const { renderer } = useThrelte();

  // Prevent rerender after first render
  let cameraReady = false;
  onMount(() => {
    cameraReady = true;
  });
</script>

<!-- Move camera on mouse move -->
<svelte:window on:mousemove={handleMouseMove} />

<T.Group rotation={[$cameraRotationX, $cameraRotationY, 0]}>
  <T.PerspectiveCamera
    let:ref
    makeDefault
    position={[0, 100, 300]}
    zoom={cameraZoom}
  >
    <!-- <T.OrbitControls args={[ref, renderer?.domElement]} /> -->
    <TransformableObject object={ref} lookAt={new Vector3(0, 0, 0)} />
  </T.PerspectiveCamera>
</T.Group>
