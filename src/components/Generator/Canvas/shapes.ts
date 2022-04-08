import { Point } from '../models/Point';

export function drawArc(
  canvasRef: any,
  s: Point,
  e: Point,
  weight: number,
  color: string
) {
  if (canvasRef.current) {
    let context = canvasRef.current.getContext('2d');
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = weight;
    context.moveTo(s.x, s.y);
    context.lineTo(e.x, e.y);
    context.stroke();
    context.closePath();
  }
}

export function drawLine(
  canvasRef: any,
  s: Point,
  e: Point,
  weight: number,
  color: string
) {
  if (canvasRef.current) {
    let context = canvasRef.current.getContext('2d');
    context.lineWidth = weight;
    context.lineStyle = color;
    context.beginPath();
    context.moveTo(s.x, s.y);
    context.lineTo(e.x, e.y);
    context.stroke();
    context.closePath();
  }
}

export function drawCircle(
  canvasRef: any,
  c: Point,
  radius: number,
  weight: number,
  color: string
) {
  if (canvasRef.current) {
    let context = canvasRef.current.getContext('2d');
    context.lineWidth = weight;
    context!.strokeStyle = color; //blue
    context!.beginPath();
    context!.arc(c.x, c.y, radius, 0, 2 * Math.PI);
    context!.stroke();
    context!.closePath();
  }
}

export function drawPoint(
  canvasRef: any,
  c: Point,
  radius: number,
  color: string
) {
  let context = canvasRef.current.getContext('2d');
  context!.fillStyle = color;
  context!.beginPath();
  context!.arc(c.x, c.y, radius, 0, 2 * Math.PI);
  context!.stroke();
  context!.closePath();
  context!.fill();
}

export function drawCanvas(
  canvasRef: any,
  w: number,
  h: number,
  color: string
) {
  let context = canvasRef.current.getContext('2d');
  context!.fillStyle = color;
  context!.fillRect(0, 0, w, h);
}

export function hideCanvas(canvasRef: any) {
  let context = canvasRef.current.getContext('2d');
  context.canvas.hidden = true;
}

export function showCanvas(canvasRef: any) {
  let context = canvasRef.current.getContext('2d');
  context.canvas.hidden = false;
}

export function clearCanvas(canvasRef: any, w: number, h: number) {
  let context = canvasRef.current.getContext('2d');
  context.clearRect(0, 0, w, h);
}
