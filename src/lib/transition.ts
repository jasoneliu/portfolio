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
  axis?: 'x' | 'y';
}

// Svelte's slide transition with constant opacity
export function slide(
  node: Element,
  { delay = 0, duration = 400, easing = cubicOut, axis = 'y' }: SlideParams = {}
): TransitionConfig {
  const style = getComputedStyle(node);
  const opacity = +style.opacity;
  const primary_property = axis === 'y' ? 'height' : 'width';
  const primary_property_value = parseFloat(style[primary_property]);
  const secondary_properties =
    axis === 'y' ? ['top', 'bottom'] : ['left', 'right'];
  const capitalized_secondary_properties = secondary_properties.map(
    (e) => `${e[0].toUpperCase()}${e.slice(1)}`
  );

  const padding_start_value = parseFloat(
    /* @ts-expect-error: From svelte/transition */
    style[`padding${capitalized_secondary_properties[0]}`]
  );
  const padding_end_value = parseFloat(
    /* @ts-expect-error: From svelte/transition */
    style[`padding${capitalized_secondary_properties[1]}`]
  );
  const margin_start_value = parseFloat(
    /* @ts-expect-error: From svelte/transition  */
    style[`margin${capitalized_secondary_properties[0]}`]
  );
  const margin_end_value = parseFloat(
    /* @ts-expect-error: From svelte/transition */
    style[`margin${capitalized_secondary_properties[1]}`]
  );
  const border_width_start_value = parseFloat(
    /* @ts-expect-error: From svelte/transition */
    style[`border${capitalized_secondary_properties[0]}Width`]
  );
  const border_width_end_value = parseFloat(
    /* @ts-expect-error: From svelte/transition */
    style[`border${capitalized_secondary_properties[1]}Width`]
  );

  return {
    delay,
    duration,
    easing,
    css: (t) =>
      'overflow: hidden;' +
      `opacity: ${opacity};` +
      `${primary_property}: ${t * primary_property_value}px;` +
      `padding-${secondary_properties[0]}: ${t * padding_start_value}px;` +
      `padding-${secondary_properties[1]}: ${t * padding_end_value}px;` +
      `margin-${secondary_properties[0]}: ${t * margin_start_value}px;` +
      `margin-${secondary_properties[1]}: ${t * margin_end_value}px;` +
      `border-${secondary_properties[0]}-width: ${
        t * border_width_start_value
      }px;` +
      `border-${secondary_properties[1]}-width: ${
        t * border_width_end_value
      }px;`,
  };
}
