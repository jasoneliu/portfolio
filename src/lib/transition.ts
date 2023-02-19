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

interface SlideParams {
  delay?: number;
  duration?: number;
  easing?: EasingFunction;
}

// Svelte's slide transition with constant opacity
export function slide(
  node: Element,
  { delay = 0, duration = 400, easing = cubicOut }: SlideParams = {}
): TransitionConfig {
  const style = getComputedStyle(node);
  const opacity = +style.opacity;
  const height = parseFloat(style.height);
  const padding_top = parseFloat(style.paddingTop);
  const padding_bottom = parseFloat(style.paddingBottom);
  const margin_top = parseFloat(style.marginTop);
  const margin_bottom = parseFloat(style.marginBottom);
  const border_top_width = parseFloat(style.borderTopWidth);
  const border_bottom_width = parseFloat(style.borderBottomWidth);

  return {
    delay,
    duration,
    easing,
    css: (t) =>
      'overflow: hidden;' +
      `opacity: ${opacity};` +
      `height: ${t * height}px;` +
      `padding-top: ${t * padding_top}px;` +
      `padding-bottom: ${t * padding_bottom}px;` +
      `margin-top: ${t * margin_top}px;` +
      `margin-bottom: ${t * margin_bottom}px;` +
      `border-top-width: ${t * border_top_width}px;` +
      `border-bottom-width: ${t * border_bottom_width}px;`,
  };
}

// Svelte's slide transition with width instead of height
export function slideHorizontal(
  node: Element,
  { delay = 0, duration = 400, easing = cubicOut }: SlideParams = {}
): TransitionConfig {
  const style = getComputedStyle(node);
  const opacity = +style.opacity;
  const width = parseFloat(style.width);
  const padding_top = parseFloat(style.paddingTop);
  const padding_bottom = parseFloat(style.paddingBottom);
  const margin_top = parseFloat(style.marginTop);
  const margin_bottom = parseFloat(style.marginBottom);
  const border_top_width = parseFloat(style.borderTopWidth);
  const border_bottom_width = parseFloat(style.borderBottomWidth);

  return {
    delay,
    duration,
    easing,
    css: (t) =>
      'overflow: hidden;' +
      `opacity: ${opacity};` +
      `width: ${t * width}px;` +
      `padding-top: ${t * padding_top}px;` +
      `padding-bottom: ${t * padding_bottom}px;` +
      `margin-top: ${t * margin_top}px;` +
      `margin-bottom: ${t * margin_bottom}px;` +
      `border-top-width: ${t * border_top_width}px;` +
      `border-bottom-width: ${t * border_bottom_width}px;`,
  };
}
