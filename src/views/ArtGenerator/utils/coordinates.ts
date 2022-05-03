import { IPoint } from '../types'

function td(n: number): number {
  return parseFloat(n.toFixed(1))
}

// current position of the rotor center
export function calcRotorCenter(R: number, r: number, alpha: number, origin: IPoint): IPoint {
  const x = (R - r) * Math.cos(alpha)
  const y = (R - r) * Math.sin(alpha)
  return { x: td(x + origin.x), y: td(y + origin.y) }
}

// current position of the pencil point
export function calcPencilPoint(rotorCenter: IPoint, R: number, r: number, d: number, alpha: number): IPoint {
  const m = (R - r) / r
  const x = rotorCenter.x + d * Math.cos(m * alpha)
  const y = rotorCenter.y - d * Math.sin(m * alpha)
  return { x: td(x), y: td(y) }
}

// angle to center of rotor
export function calcAlpha(L: number, R: number): number {
  return td(L / R)
}

// center of canvas
export function calcOrigin(w: number, h: number): IPoint {
  const x = w / 2
  const y = h / 2
  return { x: td(x), y: td(y) }
}

export const speedOptions = [
  {
    name: 'slowest',
    speed: 0.01,
  },
  {
    name: 'slower',
    speed: 0.1,
  },
  {
    name: 'slow',
    speed: 1,
  },
  {
    name: 'fast',
    speed: 10,
  },
  {
    name: 'faster',
    speed: 200,
  },
  {
    name: 'fastest',
    speed: 1000,
  },
]
