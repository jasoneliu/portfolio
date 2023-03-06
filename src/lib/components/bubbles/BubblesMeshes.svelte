<script lang="ts">
  import { scrollY } from '$lib/store';
  import {
    BackSide,
    BufferAttribute,
    Color,
    SphereGeometry,
    Vector3,
  } from 'three';
  import { T, InteractiveObject, useFrame } from '@threlte/core';
  import { Environment, Float } from '@threlte/extras';
  import { createNoise3D } from 'simplex-noise';

  interface Bubble {
    id: number;
    geometry: SphereGeometry;
    position: Vector3;
    scale: number;
    randomness: number;
  }

  // Bubble configuration
  const numBubbles: number = 10;
  const bubbleRadius: number = 8;
  const bubbleGeometry = new SphereGeometry(bubbleRadius, 64, 32);

  // Noise for bubble geometry
  const noise3D = createNoise3D();

  // Bubbles
  let bubbles: Bubble[] = [];
  while (bubbles.length < numBubbles) {
    addBubble();
  }

  // Clock
  let elapsedTime: number = 0;

  /** Generate a random number in a given range. */
  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  /** Add a bubble to the scene. */
  function addBubble() {
    // Bubble ID
    let id: number = 0;
    if (bubbles.length > 0) {
      id = bubbles[bubbles.length - 1].id + 1;
    }

    // Geometry
    const geometry = bubbleGeometry.clone() as SphereGeometry;

    // Starting position
    const position = new Vector3(0, 0, 0);

    // Size
    const scale = randomInRange(1, 3);

    // Random movement
    const randomness = randomInRange(0, 1);

    // Add bubble to scene
    const bubble: Bubble = { id, geometry, position, scale, randomness };
    bubbles.push(bubble);
  }

  /** Remove a bubble from the scene. */
  function popBubble(bubbleIndex: number) {
    // Remove bubble
    bubbles.splice(bubbleIndex, 1);

    // Re-add bubble
    setTimeout(() => addBubble(), 1000);
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
    // Movement configuration
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
    if ($scrollY <= 750) {
      // Update clock
      elapsedTime += delta;

      // Update bubbles
      updateBubbles();
    }
  });
</script>

<!-- Bubbles -->
<Environment path="src/lib/assets/" files="bubble-envmap.hdr" />
{#each bubbles as bubble (bubble.id)}
  <Float speed={2} floatIntensity={10} floatingRange={[-1, 1]}>
    <T.Mesh
      let:ref
      geometry={bubble.geometry}
      position={bubble.position.toArray()}
      scale={bubble.scale}
      castShadow
    >
      <T.MeshPhysicalMaterial
        color={new Color('hsl(255, 100%, 20%))')}
        metalness={0.3}
        roughness={0}
        reflectivity={1}
        ior={1.5}
        envMapIntensity={10}
        transmission={0.7}
        specularIntensity={1}
        specularColor={new Color(0xffffff)}
        opacity={1}
        side={BackSide}
        transparent
      />
      <!-- <InteractiveObject
        object={ref}
        interactive
        on:click={() => popBubble(bubbleIndex)}
      /> -->
    </T.Mesh>
  </Float>
{/each}

<!-- Shadow plane -->
<T.Mesh position.y={-120} rotation.x={-Math.PI / 2} receiveShadow>
  <T.PlaneGeometry args={[1000, 1000]} />
  <T.ShadowMaterial color={new Color(0x000000)} opacity={0.25} />
</T.Mesh>
