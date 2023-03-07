<script lang="ts">
  import { linear, quadInOut, quintOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';
  import { innerWidth, scrollY, loading } from '$lib/store';
  import { PerspectiveCamera, Vector3 } from 'three';
  import { mapLinear } from 'three/src/math/MathUtils';
  import { T, useFrame, useThrelte } from '@threlte/core';
  import { onMount } from 'svelte';

  // Camera ref
  let camera: PerspectiveCamera;

  // Camera animation
  const positionAnimationDurationMs: number = 3000;
  const positionAnimationEasing = quintOut;

  // Camera position (spherical coordinates)
  const radius = 300;
  const initialPhi: number = Math.PI / 2 - Math.PI / 16;
  let phi = tweened<number>(initialPhi + Math.PI / 4, {
    duration: positionAnimationDurationMs,
    easing: positionAnimationEasing,
  });
  let theta = tweened<number>(-Math.PI, {
    duration: positionAnimationDurationMs,
    easing: positionAnimationEasing,
  });

  // Camera zoom
  let zoom = tweened<number>(0.5, {
    duration: 250,
    easing: linear,
  });

  // Run intro animation after load
  let introAnimating: boolean = true;
  $: if (!$loading) {
    animateIntro();
  }

  /** Run intro animation. */
  function animateIntro() {
    // Avoid intro animation if scrolled down
    if ($scrollY > 750) {
      introAnimating = false;
      return;
    }

    // Intro animation parameters
    const animationDurationMs = 3000;
    const animationEasing = quadInOut;

    // Animate camera position
    phi.set(initialPhi, {
      duration: animationDurationMs,
      easing: animationEasing,
    });
    theta.set(0, { duration: animationDurationMs, easing: animationEasing });

    // Zoom in and out
    zoom.set(1.25, {
      duration: animationDurationMs / 2,
      easing: animationEasing,
    });
    zoom.set(1, {
      duration: animationDurationMs / 2,
      delay: animationDurationMs / 2,
      easing: animationEasing,
    });

    // Enable scroll and mousemove animations
    setTimeout(() => (introAnimating = false), animationDurationMs);
  }

  // Animate camera on scroll
  $: $scrollY, handleScroll();

  /** Update camera position and zoom on scroll. */
  function handleScroll() {
    if (cameraReady && $scrollY <= 750) {
      phi.set(initialPhi - $scrollY / 500);
      theta.set(-$scrollY / 500);
      zoom.set((750 - $scrollY) / 750);
    }
  }

  /** Update camera position on mouse move. */
  function handleMouseMove(event: MouseEvent) {
    if (!introAnimating && $scrollY <= 750 && $innerWidth >= 576) {
      phi.set(
        mapLinear(
          1 - event.clientY / window.innerHeight,
          0,
          1,
          initialPhi - Math.PI / 8,
          initialPhi + Math.PI / 8
        )
      );
      theta.set(
        mapLinear(
          event.clientX / window.innerWidth,
          0,
          1,
          -Math.PI / 8,
          Math.PI / 8
        )
      );
    }
  }

  // Prevent re-render on first render
  let cameraReady: boolean = false;
  onMount(() => {
    cameraReady = true;
  });

  // Camera always looks at origin
  useFrame(() => {
    camera.lookAt(new Vector3(0, 0, 0));
  });

  // Renderer for OrbitControls
  const { renderer } = useThrelte();
</script>

<!-- Animate camera on mouse move -->
<svelte:window on:mousemove={handleMouseMove} />

<T.PerspectiveCamera
  bind:ref={camera}
  makeDefault
  position={new Vector3()
    .setFromSphericalCoords(radius, $phi, $theta)
    .toArray()}
  zoom={$zoom}
>
  <!-- {#if camera}
    <T.OrbitControls args={[camera, renderer?.domElement]} />
  {/if} -->
</T.PerspectiveCamera>
