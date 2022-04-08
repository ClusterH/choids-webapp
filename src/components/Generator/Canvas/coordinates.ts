import { Point } from '../models/Point';

function td(n: number): number {
  return parseFloat(n.toFixed(1));
}

// current position of the rotor center
export function calcRotorCenter(
  R: number,
  r: number,
  alpha: number,
  origin: Point
): Point {
  const x = (R - r) * Math.cos(alpha);
  const y = (R - r) * Math.sin(alpha);
  return { x: td(x + origin.x), y: td(y + origin.y) };
}

// current position of the pencil point
export function calcPencilPoint(
  rotorCenter: Point,
  R: number,
  r: number,
  d: number,
  alpha: number
): Point {
  const m = (R - r) / r;
  const x = rotorCenter.x + d * Math.cos(m * alpha);
  const y = rotorCenter.y - d * Math.sin(m * alpha);
  return { x: td(x), y: td(y) };
}

// angle to center of rotor
export function calcAlpha(L: number, R: number): number {
  return td(L / R);
}

// center of canvas
export function calcOrigin(w: number, h: number): Point {
  const x = w / 2;
  const y = h / 2;
  return { x: td(x), y: td(y) };
}
