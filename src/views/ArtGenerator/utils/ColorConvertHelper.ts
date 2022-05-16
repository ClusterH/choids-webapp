import { Color } from '../types'

const hex = /[0-9A-F]/i

export const validHex = (value: string): boolean => {
  if (value.startsWith('#')) {
    value = value.slice(1)

    return hex.test(value[value.length - 1])
  }

  return (/\w/i.test(value) && !/\d/.test(value)) || value === ''
}

export const toHex = (value: string): Color['hex'] | undefined => {
  if (value.length === 7 || value.length === 9) {
    return value
  }

  return undefined
}

export const hex2rgb = (hex: Color['hex']): Color['rgb'] => {
  hex = hex.slice(1)

  const r = hex.slice(0, 2) === '00' ? 0 : parseInt(hex.slice(0, 2), 16)
  const g = hex.slice(2, 4) === '00' ? 0 : parseInt(hex.slice(2, 4), 16)
  const b = hex.slice(4, 6) === '00' ? 0 : parseInt(hex.slice(4, 6), 16)

  if (hex.slice(6, 8) === '00') return { r, g, b, a: 0 }

  let a = parseInt(hex.slice(6, 8), 16) || undefined

  if (a !== undefined) a /= 255

  return { r, g, b, a }
}

export const rgb2hsv = ({ r, g, b, a }: Color['rgb']): Color['hsv'] => {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const d = max - Math.min(r, g, b)

  const h = d ? (max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? 2 + (b - r) / d : 4 + (r - g) / d) * 60 : 0
  const s = max ? (d / max) * 100 : 0
  const v = max * 100

  return { h, s, v, a }
}

export const toColor = (color: string): Color | undefined => {
  const value = color as Color['hex']

  const hex = toHex(value)

  if (hex === undefined) return undefined
  const rgb = hex2rgb(hex)
  const hsv = rgb2hsv(rgb)

  return { hex, rgb, hsv }
}
