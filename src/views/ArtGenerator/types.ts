export interface IArtLayer {
  id: number
  isActived: boolean
  isHide: boolean
}

export interface IArtParams {
  size: number
  pencilSize: number
  canvasColor: string
  backgroundColor: string
  radii: { id: number; r: number }[]
}

export interface ICoord {
  x: number
  y: number
}

export interface IPoint {
  x: number | null
  y: number | null
  r: number
  color: string
  fill: boolean
  angle?: number
}

export interface Color {
  readonly hex: string
  readonly rgb: ColorRGB
  readonly hsv: ColorHSV
}

interface ColorRGB {
  readonly r: number
  readonly g: number
  readonly b: number
  readonly a?: number
}

interface ColorHSV {
  readonly h: number
  readonly s: number
  readonly v: number
  readonly a?: number
}
