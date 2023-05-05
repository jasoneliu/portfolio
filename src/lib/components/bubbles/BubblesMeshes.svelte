<script lang="ts">
  import { scrollY, pageLoading, pageTransitioning } from '$lib/store';
  import {
    BackSide,
    BufferAttribute,
    Color,
    SphereGeometry,
    Vector3,
  } from 'three';
  import { T, useFrame } from '@threlte/core';
  import { Environment, Float } from '@threlte/extras';
  import { createNoise3D } from 'simplex-noise';

  // Scene is visible when $scrollY <= maxScrollY
  export let maxScrollY: number;

  // Clock
  let elapsedTime = 0;

  interface Bubble {
    id: number;
    geometry: SphereGeometry;
    position: Vector3;
    scale: number;
    opacityScrollStart: number;
    opacityScrollEnd: number;
    randomness: number;
  }

  // Bubble parameters
  const numBubbles = 10;
  const bubbleRadius = 8;
  const bubbleGeometry = new SphereGeometry(bubbleRadius, 64, 32);

  // Noise for bubble geometry
  const noise3D = createNoise3D();

  // Initialize list of bubbles
  let bubbles: Bubble[] = [];
  while (bubbles.length < numBubbles) {
    addBubble();
  }
  updateBubbles();

  // Fade in bubbles during intro animation
  let introFadingIn = false;
  $: if (!$pageLoading && !$pageTransitioning) {
    fadeInBubbles();
  }
  $: if (introFadingIn && $scrollY > 0) {
    introFadingIn = false;
  }

  /** Generate a random number in a given range. */
  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  /** Add a bubble to the scene. */
  function addBubble() {
    // Bubble ID
    let id = 0;
    if (bubbles.length > 0) {
      id = bubbles[bubbles.length - 1].id + 1;
    }

    // Geometry
    const geometry = bubbleGeometry.clone() as SphereGeometry;

    // Starting position
    const position = new Vector3(0, 0, 0);

    // Size
    const scale = randomInRange(1, 3);

    // Scroll positions at which bubbles fade from scene
    const opacityScrollStartScale = randomInRange(0.1, 0.7);
    const opacityScrollStart = maxScrollY * opacityScrollStartScale;
    const opacityScrollEnd =
      maxScrollY *
      randomInRange(Math.max(opacityScrollStartScale + 0.2, 0.4), 1);

    // Random movement
    const randomness = randomInRange(0, 1);

    // Add bubble to scene
    const bubble: Bubble = {
      id,
      geometry,
      position,
      scale,
      opacityScrollStart,
      opacityScrollEnd,
      randomness,
    };
    bubbles.push(bubble);
  }

  /** Fade in bubbles. */
  function fadeInBubbles() {
    if ($scrollY <= maxScrollY) {
      introFadingIn = true;
      setTimeout(() => {
        introFadingIn = false;
      }, 2000);
    }
  }

  /** Morph bubble shape. */
  function morphBubble(bubble: Bubble) {
    // Get position vectors of bubble geometry
    let originalPosition = bubbleGeometry.attributes
      .position as BufferAttribute;
    let newPosition = bubble.geometry.attributes.position as BufferAttribute;

    // Morph position vectors
    for (
      let vectorIndex = 0;
      vectorIndex < originalPosition.count;
      vectorIndex++
    ) {
      // Get original position vector
      const x = originalPosition.getX(vectorIndex);
      const y = originalPosition.getY(vectorIndex);
      const z = originalPosition.getZ(vectorIndex);

      // Compute noise
      const noise = noise3D(
        x * 0.025 + elapsedTime * 0.1 + bubble.randomness,
        y * 0.025 + elapsedTime * 0.1 + bubble.randomness,
        z * 0.025 + elapsedTime * 0.1 + bubble.randomness
      );
      const scale = 1 + noise * 0.25;

      // Add noise to position vector
      newPosition.setXYZ(vectorIndex, x * scale, y * scale, z * scale);
    }

    // Update bubble geometry
    bubble.geometry.computeVertexNormals();
    newPosition.needsUpdate = true;
  }

  /** Move bubble. */
  function moveBubble(bubble: Bubble) {
    // Movement parameters
    const speed = 0.05 + 0.1 * bubble.randomness;
    const phi = elapsedTime * speed + 50 * bubble.randomness;
    const theta = elapsedTime * -speed + 50 * bubble.randomness * 0.5;

    // Update position
    bubble.position.x = 200 * Math.cos(theta) * Math.sin(phi);
    bubble.position.y = 75 * Math.sin(theta) * Math.sin(phi);
    bubble.position.z = 75 * Math.cos(phi);
  }

  /** Update bubbles. */
  function updateBubbles() {
    // Morph and move bubbles
    for (const bubble of bubbles) {
      morphBubble(bubble);
      moveBubble(bubble);
    }

    // Rerender bubbles
    bubbles = bubbles;
  }

  // Animate bubbles
  useFrame((_, delta) => {
    // Only animate when scene is visible
    if ($scrollY <= maxScrollY && !$pageLoading && !$pageTransitioning) {
      // Update clock
      elapsedTime += delta;

      // Update bubbles
      updateBubbles();
    }
  });
</script>

<!-- Bubbles -->
<Environment path="/" files="bubble-envmap.png" />
{#each bubbles as bubble (bubble.id)}
  <Float speed={2} floatIntensity={10} floatingRange={[-1, 1]}>
    <T.Mesh
      geometry={bubble.geometry}
      position={bubble.position.toArray()}
      scale={bubble.scale}
      castShadow
    >
      <T.MeshPhysicalMaterial
        color={new Color('hsl(255, 100%, 20%))')}
        metalness={0.3}
        roughness={0}
        transmission={0.6}
        clearcoat={0.5}
        envMapIntensity={10}
        side={BackSide}
        opacity={introFadingIn
          ? Math.min(elapsedTime - 0.5 * bubble.randomness, 1)
          : Math.min(
              (bubble.opacityScrollEnd - $scrollY) /
                (bubble.opacityScrollEnd - bubble.opacityScrollStart),
              1
            )}
        transparent
      />
    </T.Mesh>
  </Float>
{/each}

<!-- Shadow plane -->
<T.Mesh position.y={-120} rotation.x={-Math.PI / 2} receiveShadow>
  <T.PlaneGeometry args={[1000, 1000]} />
  <T.ShadowMaterial opacity={0.2 - 0.2 * ($scrollY / maxScrollY)} />
</T.Mesh>
