<script lang="ts">
  import { onMount } from 'svelte';
  import { quadInOut, quintOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';
  import { innerWidth, scrollY, loading } from '$lib/store';
  import { PerspectiveCamera, Vector3 } from 'three';
  import { mapLinear } from 'three/src/math/MathUtils';
  import { T, useFrame, useThrelte } from '@threlte/core';

  // Camera ref
  let camera: PerspectiveCamera;

  // Camera position (spherical coordinates) and zoom
  const radius = 275;
  const initialPhi: number = Math.PI / 2 - Math.PI / 16;
  let phi = tweened<number>(initialPhi + Math.PI / 4);
  let theta = tweened<number>(-Math.PI);
  let zoom = tweened<number>(0.5);

  // Intro animation options
  const introAnimationDurationMs = 3000;
  const introAnimationEasing = quadInOut;
  const introAnimationOptions = {
    duration: introAnimationDurationMs,
    easing: introAnimationEasing,
  };

  // Scroll animation options
  const scrollAnimationOptions = {
    duration: 0,
  };

  // Mousemove animation options
  const mousemoveAnimationOptions = {
    duration: 3000,
    easing: quintOut,
  };

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

    // Animate camera position
    phi.set(initialPhi, introAnimationOptions);
    theta.set(0, introAnimationOptions);

    // Zoom in and out
    zoom.set(1.25, {
      duration: introAnimationDurationMs / 2,
      easing: introAnimationEasing,
    });
    zoom.set(1, {
      duration: introAnimationDurationMs / 2,
      delay: introAnimationDurationMs / 2,
      easing: introAnimationEasing,
    });

    // Enable mousemove animations
    setTimeout(() => (introAnimating = false), introAnimationDurationMs);
  }

  // Animate camera on scroll
  $: $scrollY, handleScroll();

  /** Update camera position and zoom on scroll. */
  function handleScroll() {
    if (cameraReady && $scrollY <= 750) {
      phi.set(initialPhi - $scrollY / 1000, scrollAnimationOptions);
      theta.set(-$scrollY / 750, scrollAnimationOptions);
      zoom.set((750 - $scrollY * 0.5) / 750, scrollAnimationOptions);
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
        ),
        mousemoveAnimationOptions
      );
      theta.set(
        mapLinear(
          event.clientX / window.innerWidth,
          0,
          1,
          -Math.PI / 8,
          Math.PI / 8
        ),
        mousemoveAnimationOptions
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
