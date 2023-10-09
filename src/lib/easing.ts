// https://github.com/sveltejs/svelte/issues/549#issuecomment-1113211696

interface Point {
  x: number;
  y: number;
}

function cubicBezier(t: number, p1: Point, p2: Point): Point {
  const p0: Point = {
    x: 0,
    y: 0,
  };

  const p3: Point = {
    x: 1,
    y: 1,
  };

  const x =
    (1 - t) ** 3 * p0.x +
    (1 - t) ** 2 * t * 3 * p1.x +
    (1 - t) * t ** 2 * 3 * p2.x +
    t ** 3 * p3.x;
  const y =
    (1 - t) ** 3 * p0.y +
    (1 - t) ** 2 * t * 3 * p1.y +
    (1 - t) * t ** 2 * 3 * p2.y +
    t ** 3 * p3.y;

  return { x, y };
}

const bubblesScrollP1: Point = {
  x: 0,
  y: 1,
};

const bubblesScrollP2: Point = {
  x: 0,
  y: 0.5,
};

export function bubblesScroll(t: number): number {
  return cubicBezier(t, bubblesScrollP1, bubblesScrollP2).y;
}
