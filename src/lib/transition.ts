// https://github.com/sveltejs/svelte/blob/master/src/runtime/transition/index.ts

import { cubicOut } from 'svelte/easing';

export type EasingFunction = (t: number) => number;

interface TransitionConfig {
  delay?: number;
  duration?: number;
  easing?: EasingFunction;
  css?: (t: number, u: number) => string;
  tick?: (t: number, u: number) => void;
}
