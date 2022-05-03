import { IPoint } from '../types'

export const drawArc = (canvasRef: any, point1: IPoint, point2: IPoint, weight: number, color: string) => {
  if (canvasRef.current) {
    const ctx = canvasRef.current.getContext('2d')
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = weight
    ctx.moveTo(point1.x, point1.y)
    ctx.lineTo(point2.x, point2.y)
    ctx.stroke()
    ctx.closePath()
  }
}

export const drawLine = (canvasRef: any, point1: IPoint, point2: IPoint, weight: number, color: string) => {
  if (canvasRef.current) {
    const ctx = canvasRef.current.getContext('2d')
    ctx.lineWidth = weight
    ctx.lineStyle = color
    ctx.beginPath()
    ctx.moveTo(point1.x, point1.y)
    ctx.lineTo(point2.x, point2.y)
    ctx.stroke()
    ctx.closePath()
  }
}

export const drawCircle = (canvasRef: any, center: IPoint, radius: number, weight: number, color: string) => {
  if (canvasRef.current) {
    const ctx = canvasRef.current.getContext('2d')
    ctx.lineWidth = weight
    ctx.strokeStyle = color
    ctx.beginPath()
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.closePath()
  }
}

export const drawPoint = (canvasRef: any, point: IPoint, radius: number, color: string) => {
  if (canvasRef.current) {
    const ctx = canvasRef.current.getContext('2d')
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.closePath()
    ctx.fill()
  }
}

export const drawCanvas = (canvasRef: any, w: number, h: number, color: string) => {
  const ctx = canvasRef.current.getContext('2d')
  ctx.fillStyle = color
  ctx.fillRect(0, 0, w, h)
}

export const clearCanvas = (canvasRef: any, w: number, h: number) => {
  let context = canvasRef.current.getContext('2d')
  context.clearRect(0, 0, w, h)
}
