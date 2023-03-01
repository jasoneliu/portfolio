<script lang="ts">
  import { scrollY } from '$lib/store';
  import * as THREE from 'three';
  import {
    T,
    InteractiveObject,
    useFrame,
    useThrelte,
    PerspectiveCamera,
    OrbitControls,
  } from '@threlte/core';
  import { Environment, Float } from '@threlte/extras';

  interface Bubble {
    id: number;
    position: THREE.Vector3;
    scale: number;
    randomness: number;
  }

  const numBubbles = 10;
  const bubbleRadius = 8;
  let bubbles: Bubble[] = [];
  let elapsedTime = 0;

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
    const position = new THREE.Vector3(0, 0, 0);
    position.x = randomInRange(-725, -725 + 1350);
    position.y = randomInRange(-725, -725 + 1350);
    position.z = randomInRange(-725, -725 + 1350);

    // Size
    const scale = randomInRange(1, 3);

    // Random movement
    const randomness = randomInRange(0, 1);

    // Add to scene
    bubbles.push({ id, position, scale, randomness });
  }

  while (bubbles.length < numBubbles) {
    addBubble();
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
      bubble.position.z = 50 * Math.cos(phi);
    }

    // Rerender bubbles
    bubbles = bubbles;
  }

  // Move bubbles on every frame
  useFrame((_, delta) => {
    updateBubblePositions(delta);
  });

  // const { renderer } = useThrelte();
</script>

<!-- Camera -->
<!-- <T.PerspectiveCamera let:ref position={[0, 50, 200]}> -->
<!-- <OrbitControls maxDistance={1000} maxAzimuthAngle={1} minAzimuthAngle={-1} /> -->
<!-- <T.OrbitControls args={[ref, renderer?.domElement]} maxDistance={1000} /> -->
<!-- </T.PerspectiveCamera> -->

<PerspectiveCamera fov={50} position={{ x: 0, y: 50, z: 200 }}>
  <!-- <OrbitControls maxDistance={1000} /> -->
</PerspectiveCamera>

<!-- Helpers -->
<T.GridHelper size={1000} divisions={10} />
<T.AxesHelper size={5000} />

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
    near={-100}
    far={200}
  />
</T.DirectionalLight>

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
        color={new THREE.Color('hsl(255, 100%, 20%))')}
        metalness={0.3}
        roughness={0}
        reflectivity={1}
        ior={1.5}
        envMapIntensity={10}
        transmission={0.7}
        specularIntensity={1}
        specularColor={new THREE.Color(0xffffff)}
        opacity={1}
        side={THREE.BackSide}
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
<T.Mesh position.y={-100} rotation.x={-Math.PI / 2} receiveShadow>
  <T.PlaneGeometry args={[1000, 1000]} />
  <T.ShadowMaterial color={new THREE.Color(0x000000)} opacity={0.25} />
</T.Mesh>
