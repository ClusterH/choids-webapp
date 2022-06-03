import { IArtParams } from '../types'

const cos = Math.cos
const sin = Math.sin

export const hypotrochoid = (d: number, radii: number[], t: number, output: any) => {
  output = output || []

  let x = 0
  let y = 0
  let a
  let b

  const l = radii.length - 1

  const cosT = cos(t)
  const sinT = sin(t)

  for (let i = 0; i < l; i += 1) {
    b = radii[i + 1]
    a = radii[i] - b
    x += a * cosT + d * cos((a / b) * t)
    y += a * sinT - d * sin((a / b) * t)
  }

  output[0] = x
  output[1] = y

  return output
}

export const drawArt = (params: IArtParams, canvasRef: any, width: number, height: number) => {
  let output: number[] = []

  const h = params.size * params.zoom // To Do -- should update with screen size Height or Container height
  const w = width * params.zoom
  const he = height * params.zoom

  if (canvasRef.current) {
    const ctx = canvasRef.current.getContext('2d')
    ctx.clearRect(0, 0, Math.max(w, width), Math.max(he, height))
    ctx.fillStyle = params.backgroundColor
    ctx.fillRect(0, 0, width, height)
    ctx.save()
    ctx.translate(width / 2, width / 2)
    ctx.rotate(params.degrees * (Math.PI / 180))

    ctx.strokeStyle = params.canvasColor
    ctx.lineWidth = params.pencilSize + 0.1
    ctx.beginPath()

    // The rest of the code is presentation:
    // this is how you would use the module
    // to trace out a curv
    hypotrochoid(
      h,
      params.radii.map((radius) => radius.r * params.zoom),
      0,
      output
    )
    ctx.moveTo(output[0], output[1])
    for (let i = 0; i < 40000; i += 2.5) {
      hypotrochoid(
        h,
        params.radii.map((radius) => radius.r * params.zoom),
        (i * Math.PI) / 100,
        output
      )
      ctx.lineTo(output[0], output[1])
    }

    ctx.stroke()

    ctx.restore()
  }
}
