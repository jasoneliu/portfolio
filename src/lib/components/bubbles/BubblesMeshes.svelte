<script lang="ts">
  import { scrollY } from '$lib/store';
  import { BackSide, Color, Vector3 } from 'three';
  import { T, InteractiveObject, useFrame } from '@threlte/core';
  import { Environment, Float } from '@threlte/extras';

  interface Bubble {
    id: number;
    position: THREE.Vector3;
    scale: number;
    randomness: number;
  }

  // Bubble configuration
  const numBubbles: number = 10;
  const bubbleRadius: number = 8;

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

    // Starting position
    const position = new Vector3(0, 0, 0);

    // Size
    const scale = randomInRange(1, 3);

    // Random movement
    const randomness = randomInRange(0, 1);

    // Add to scene
    bubbles.push({ id, position, scale, randomness });
  }

  /** Remove a bubble from the scene. */
  function popBubble(bubbleIndex: number) {
    // Remove bubble
    bubbles.splice(bubbleIndex, 1);

    // Re-add bubble
    setTimeout(() => addBubble(), 1000);
  }

  /** Move each bubble. */
  function updateBubblePositions(delta: number) {
    // Update
    elapsedTime += delta;

    // Update bubble positions
    for (const bubble of bubbles) {
      const speed = 0.05 + 0.1 * bubble.randomness;
      const phi = elapsedTime * speed + 50 * bubble.randomness;
      const theta = elapsedTime * -speed + 50 * bubble.randomness * 0.5;

      bubble.position.x = 200 * Math.cos(theta) * Math.sin(phi);
      bubble.position.y = 75 * Math.sin(theta) * Math.sin(phi);
      bubble.position.z = 75 * Math.cos(phi);
    }

    // Rerender bubbles
    bubbles = bubbles;
  }

  // Move bubbles on every frame
  useFrame((_, delta) => {
    if ($scrollY <= 750) {
      updateBubblePositions(delta);
    }
  });
</script>

<!-- Bubbles -->
<Environment path="src/lib/assets/" files="bubble-envmap.hdr" />
{#each bubbles as bubble (bubble.id)}
  <Float speed={2} floatIntensity={10} floatingRange={[-1, 1]}>
    <T.Mesh
      let:ref
      position={bubble.position.toArray()}
      scale={bubble.scale}
      castShadow
    >
      <T.SphereGeometry args={[bubbleRadius, 64, 32]} />
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
