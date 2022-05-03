import { useEffect, useRef, useState } from 'react'

import { useArtParamSettings } from 'state/artGenerator/hook'

import { IPoint } from '../types'
import { calcAlpha, calcPencilPoint, calcRotorCenter } from '../utils/coordinates'
import { clearCanvas, drawArc, drawCircle, drawLine, drawPoint } from '../utils/drawHelper'

export function useInterval(callback: any, delay: number) {
  const savedCallback: any = useRef()

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export const useDraw = () => {
  const circlesCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const artCanvasRef = useRef<HTMLCanvasElement | null>(null)

  const [alpha, setAlpha] = useState(0)
  const [iterator, setIterator] = useState(0)
  const [currentPencil, setCurrentPencil] = useState({ x: 0, y: 0 })
  const [startingPencil, setStartingPencil] = useState({ x: 0, y: 0 })

  const [segments] = useState(200)
  const [circleWeight] = useState(0.5)
  const [circleColor] = useState('#323232')
  const [pencilDiameter] = useState(4)
  const [drawing, setDrawing] = useState(false)

  const artParamSettings = useArtParamSettings()

  console.log(artParamSettings)

  const draw = true
  const width = 512
  const height = 512

  useInterval(() => {
    if (draw) {
      let tempAlpha = alpha

      if (circlesCanvasRef.current) {
        setDrawing(true)
        const statorCircumference = 2 * Math.PI * artParamSettings[0].statorRadius
        const segmentLength = statorCircumference / (segments + 1)
        const currentPosition = iterator * segmentLength
        tempAlpha = calcAlpha(currentPosition, artParamSettings[0].statorRadius)
        console.log(tempAlpha, currentPosition, artParamSettings[0].statorRadius)
        const pp: IPoint = drawCircleLayer(tempAlpha)
        setCurrentPencil(pp)

        // see if we are back at the beginning
        if (startingPencil.x === currentPencil.x) {
          console.log('back at the beginning')
          console.log('x', startingPencil.x, currentPencil.x)
          console.log('y', startingPencil.y, currentPencil.y)
        }
        // record the starting point
        // do this after the check so first pass
        // doesn't shut us down
        if (iterator === 0) {
          console.log('starting pencil', pp)
          setStartingPencil(pp)
        }
        // draw the art
        drawArc(artCanvasRef, currentPencil, pp, artParamSettings[0].pencilSize, artParamSettings[0].pencilColor)
      }
      setAlpha(tempAlpha)
      setIterator(iterator + 1)
    }
  }, artParamSettings[0].speed / 1000)

  const drawCircleLayer = (alpha: number) => {
    // self cleaning
    clearCanvas(circlesCanvasRef, width, height)
    const origin: IPoint = { x: width / 2, y: height / 2 }
    // const origin: IPoint = { x: originX, y: originY };
    // draw the stator
    drawCircle(circlesCanvasRef, origin, artParamSettings[0].statorRadius, circleWeight, circleColor)
    // draw the stator center
    drawPoint(circlesCanvasRef, origin, pencilDiameter, circleColor)
    // draw the rotor
    // todo: implment system wide alpha
    console.log('alpha', alpha)
    const rotorCenter: IPoint = calcRotorCenter(artParamSettings[0].statorRadius, 32, alpha, origin)
    drawCircle(circlesCanvasRef, rotorCenter, 32, circleWeight, circleColor)
    // draw the rotor center
    drawPoint(circlesCanvasRef, rotorCenter, pencilDiameter, circleColor)
    // draw the pencil point
    // todo: implment system wide alpha
    const pencilPoint: IPoint = calcPencilPoint(
      rotorCenter,
      artParamSettings[0].statorRadius,
      32,
      artParamSettings[0].pencilDistance,
      alpha
    )
    drawPoint(circlesCanvasRef, { x: pencilPoint.x, y: pencilPoint.y }, pencilDiameter, artParamSettings[0].pencilColor)
    // draw the line between rotor center and stator center
    drawLine(circlesCanvasRef, origin, rotorCenter, circleWeight, circleColor)
    // draw the line between rotor and pencil
    drawLine(circlesCanvasRef, pencilPoint, rotorCenter, circleWeight, circleColor)
    return pencilPoint
  }

  return { circlesCanvasRef, artCanvasRef }
}
