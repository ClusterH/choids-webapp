import { IPoint } from '../types'

// const calcRadius = (r1: number, r2: number, isInner: boolean) => {
//   return isInner ? r1 - r2 : r1 + r2
// }

// export const calcRotorCenterPosition = (angle: number, statorRadius: number, rotorRadius: number, isInner: boolean) => {
//   return {
//     x: calcRadius(statorRadius, rotorRadius, isInner) * Math.cos(angle),
//     y: calcRadius(statorRadius, rotorRadius, isInner) * Math.sin(angle),
//     angle: (angle * calcRadius(statorRadius, rotorRadius, isInner)) / rotorRadius,
//   }
// }

// export const calcAngle = (speed: number) => {
//   return (2 * Math.PI * speed) / 1000
// }

// new stuff

export const circlePoint = (a: number, b: number, r: number, ng: number) => {
  var rad = ng * (Math.PI / 180)
  var y = r * Math.sin(rad)
  var x = r * Math.cos(rad)
  x = a + x
  y = b - y
  return {
    x: x,
    y: y,
  }
}

export const drawOneCircle = (
  canvas: HTMLCanvasElement,
  a: number,
  b: number,
  r: number,
  circleColor: string,
  pencilColor?: string,
  fill = false
) => {
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.beginPath()
    ctx.arc(a, b, r, 0, 2 * Math.PI)
    const currentColor = ctx.strokeStyle
    const currentWidth = ctx.lineWidth
    ctx.strokeStyle = circleColor
    ctx.lineWidth = 0.5
    if (fill) {
      ctx.fillStyle = pencilColor!
      ctx.fill()
      ctx.strokeStyle = pencilColor!
    }
    ctx.stroke()
    ctx.closePath()
    ctx.strokeStyle = currentColor
  }
}
