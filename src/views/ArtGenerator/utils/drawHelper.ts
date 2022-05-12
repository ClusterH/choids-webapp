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
