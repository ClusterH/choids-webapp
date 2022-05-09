export interface IArtLayer {
  id: number
  isActived: boolean
  isHide: boolean
}

export interface IArtParams {
  id: number
  statorColor: string
  rotorColor: string
  rotate: number
  speed: number
  pencilDistance: number
  pencilColor: string
  pencilSize: number
  statorRadius: number
  rotors: { r: number; isInner: boolean }[]
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
