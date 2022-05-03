export interface IArtLayer {
  id: number
  isActived: boolean
  isHide: boolean
}

export interface IArtParams {
  id: number
  canvasColor: string
  rotate: number
  originX: number
  originY: number
  speed: number
  pencilDistance: number
  pencilColor: string
  pencilSize: number
  statorRadius: number
  rotors: number[]
}

export interface IPoint {
  x: number
  y: number
}
