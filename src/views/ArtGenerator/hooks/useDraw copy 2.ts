import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

// import { useArtParamSettings, useIsDraw } from 'state/artGenerator/hook'
// import { setIsDraw } from 'state/artGenerator/reducer'
// import { useAppDispatch } from 'state/hooks'

// import { ICoord } from '../types'
// import { circlePoint, drawOneCircle } from '../utils/drawHelper'

// export const useDraw = () => {
//   const divContainerRef: any = useRef<HTMLDivElement>(null)
//   const penCanvasRef: any = useRef<HTMLCanvasElement>(null)
//   const circlesCanvasRef: any = useRef<HTMLCanvasElement>(null)

//   const artParamSettings = useArtParamSettings()
//   const isDraw = useIsDraw()
//   const dispatch = useAppDispatch()

//   const [draw, setDraw] = useState<boolean>(() => isDraw)
//   const [drawing, setDrawing] = useState<boolean>(false) // This state should be consider again if need to set with redux
//   const [penStart, setPenStart] = useState<ICoord>({ x: 0, y: 0 })
//   // const [curvePoints, setCurvePoints] = useState<ICoord[]>([])
//   const refState = useRef<{ curvePoints: ICoord[] }>({
//     curvePoints: [],
//   })

//   // Rotate drawing tools option
//   //Initial Rotation angle: always 0 for now
//   const [iOffset, setIOffset] = useState<number>(() => artParamSettings[0].rotate)
//   const [iPosition, setIPosition] = useState<number>(0)

//   // Interval - iteration
//   const [i, setI] = useState<number>(0)
//   const [iterator] = useState<number>(0.25)

//   // const refState = useRef({
//   //   i: 0,
//   //   iterator: 0.25,
//   //   timer: 0,
//   // })

//   const [timer, setTimer] = useState<number>(0)

//   console.log(artParamSettings)

//   //All stator, rotors Radiuse
//   const radii = useMemo(() => {
//     console.log(artParamSettings)
//     const radii = [artParamSettings[0].statorRadius, ...artParamSettings[0].rotors.map((rotor) => rotor.r)]
//     console.log(radii)
//     return radii
//   }, [artParamSettings])
//   //To do: check if need to add circle color in here

//   //Curve Color
//   const curveColor = useMemo(() => artParamSettings[0].pencilColor, [artParamSettings])
//   //Curve width
//   const curveWidth = useMemo(() => artParamSettings[0].pencilSize, [artParamSettings])
//   //Pen Distance
//   const penRad = useMemo(() => artParamSettings[0].pencilDistance, [artParamSettings])
//   //Speed
//   const speed = useMemo(() => artParamSettings[0].speed, [artParamSettings])
//   // Rotors types -- Hypotrochoid or Epitrochoid -- isInner: true | false
//   const types = useMemo(() => artParamSettings[0].rotors.map((rotor) => rotor.isInner), [artParamSettings])
//   // Directions and Pitches to determine rotors directions
//   const directionsAndPitches = useMemo(() => {
//     const directions: number[] = [1]
//     const drawPitches: number[] = []
//     const spinPitches: number[] = []

//     artParamSettings[0].rotors.map((rotor, index) => {
//       if (index === 0) {
//         directions.push(1)
//         drawPitches.push(1)
//       } else {
//         directions.push(directions[index - 1] * (rotor.isInner ? 1 : -1))
//         drawPitches.push(spinPitches[index - 1])
//       }
//       spinPitches.push(radii[index] / rotor.r + 1 * (rotor.isInner ? -1 : 1))
//     })

//     return { directions, drawPitches, spinPitches }
//   }, [artParamSettings, radii])
//   // To Do: check if need to set padding
//   const canvasCirclesAndPenContainerSize = useMemo(() => {
//     const width = divContainerRef.current ? divContainerRef.current.clientWidth : 800
//     const height = divContainerRef.current ? divContainerRef.current.clientHeight : 800
//     return { width, height }
//   }, [divContainerRef])

//   // Canvas center position -- ToDo: check if need to calc sidebar width
//   const centerPosition = useMemo(() => {
//     return { x: canvasCirclesAndPenContainerSize.width / 2, y: canvasCirclesAndPenContainerSize.height / 2 }
//   }, [canvasCirclesAndPenContainerSize.height, canvasCirclesAndPenContainerSize.width])

//   const handleDrawCircles = useCallback(() => {
//     if (!circlesCanvasRef.current) return
//     let thisRad = 0
//     let prevRad = 0
//     let centerRad = 0
//     let prevPitch = 0
//     let prevSpinPitch = 0
//     let prevDrawPitch = 0
//     let penPitch = 0
//     const iteration = i

//     //clear circles canvas
//     const circleCtx = circlesCanvasRef.current.getContext('2d')
//     circleCtx.clearRect(0, 0, circlesCanvasRef.current.width, circlesCanvasRef.current.height)

//     //draw Stator --To Do: update `true` with real flag to show circles or not
//     if (true) {
//       console.log(centerPosition, radii)
//       drawOneCircle(circlesCanvasRef.current, centerPosition.x, centerPosition.y, radii[0], artParamSettings[0].statorColor)
//     }

//     //start at the center
//     let ptCircle = {
//       x: centerPosition.x,
//       y: centerPosition.y,
//     }

//     let c = 1
//     //draw rotor Circles
//     while (c < radii.length) {
//       //set radii, applying zoom
//       thisRad = Number(radii[c])
//       prevRad = Number(radii[c - 1])
//       if (types[c] === true) {
//         //hypitrochoid: circle inside
//         centerRad = prevRad - thisRad
//       } else {
//         //eptrochoid: circle outside
//         centerRad = prevRad + thisRad
//       }

//       //pitches are cumulative, so extract previous from array.
//       if (c > 1) {
//         prevPitch = prevPitch + 1
//         prevSpinPitch = prevSpinPitch + directionsAndPitches.spinPitches[c - 2]
//         prevDrawPitch = prevDrawPitch + directionsAndPitches.drawPitches[c - 2]
//       } else {
//         prevPitch = 0
//         prevSpinPitch = 0
//         prevDrawPitch = 0
//       }

//       //set travel direction
//       const mult = directionsAndPitches.directions[c]

//       //set draw pitch
//       const thisPitch = (directionsAndPitches.drawPitches[c - 1] + prevDrawPitch) * mult

//       //set pen pitch
//       //physics here is subjective
//       if (types[c] === true) {
//         penPitch = (directionsAndPitches.spinPitches[c - 1] + prevSpinPitch) * mult * -1
//       } else {
//         penPitch = (directionsAndPitches.spinPitches[c - 1] + prevSpinPitch) * mult
//       }

//       //draw this rotor
//       ptCircle = circlePoint(ptCircle.x, ptCircle.y, centerRad, iteration * thisPitch)
//       if (true) {
//         drawOneCircle(circlesCanvasRef.current, ptCircle.x, ptCircle.y, thisRad, artParamSettings[0].rotorColor)
//       }

//       //draw Pen
//       //pen pitch set in last circle iteration
//       const penPt = circlePoint(ptCircle.x, ptCircle.y, thisRad, iteration * penPitch)
//       if (true) {
//         const ctx = circlesCanvasRef.current.getContext('2d')
//         ctx.lineWidth = 0.3
//         ctx.lineStyle = artParamSettings[0].statorColor
//         ctx.beginPath()
//         ctx.moveTo(ptCircle.x, ptCircle.y)
//         ctx.lineTo(penPt.x, penPt.y)
//         ctx.stroke()
//         ctx.closePath()
//         //circle for pen Point
//       }
//       c++
//     }

//     //draw Pen
//     //pen pitch set in last circle iteration
//     const penPt = circlePoint(ptCircle.x, ptCircle.y, penRad, iteration * penPitch)

//     //mark our starting point
//     if (i === 0) {
//       setPenStart(penPt)
//     }

//     //line from center to pen
//     if (true) {
//       const ctx = circlesCanvasRef.current.getContext('2d')
//       ctx.lineWidth = 0.2
//       ctx.lineStyle = artParamSettings[0].statorColor
//       ctx.beginPath()
//       ctx.moveTo(ptCircle.x, ptCircle.y)
//       ctx.lineTo(penPt.x, penPt.y)
//       ctx.stroke()
//       ctx.closePath()

//       //circle for pen Point
//       drawOneCircle(circlesCanvasRef.current, penPt.x, penPt.y, 1, curveColor, curveColor, true)
//     }

//     //update curve points for drawCurve()
//     //only maintain previous point, so we'll always plot previous to current.
//     const curvePointArray = refState.current.curvePoints
//     curvePointArray.push(penPt)
//     if (curvePointArray.length > 2) {
//       curvePointArray.shift()
//     }
//     // setCurvePoints(curvePointArray)
//     refState.current.curvePoints = curvePointArray
//   }, [i, centerPosition, radii, penRad, artParamSettings, types, directionsAndPitches, curveColor])

//   const handleRotateDrawing = useCallback(() => {
//     const degrees = iOffset * -1
//     setIPosition(iPosition + degrees)

//     if (circlesCanvasRef.current && penCanvasRef.current) {
//       const ctx = circlesCanvasRef.current.getContext('2d')
//       const ctxPen = penCanvasRef.current.getContext('2d')

//       //angle from center to upper left, we're going to translate this point
//       // removed divided by 2 for height and width
//       const ang =
//         (Math.PI / 180) * 180 - degrees * (Math.PI / 180) - Math.atan(penCanvasRef.current.clientHeight / penCanvasRef.current.clientWidth)

//       const hyp = Math.sqrt(Math.pow(penCanvasRef.current.clientHeight / 2, 2) + Math.pow(penCanvasRef.current.clientWidth / 2, 2))

//       const pt = circlePoint(centerPosition.x, centerPosition.y, hyp, ang / (Math.PI / 180))

//       //rotate pen Canvas
//       //ctxPen.save();
//       ctxPen.translate(pt.x, pt.y)
//       ctxPen.rotate(degrees * (Math.PI / 180))

//       ctx.translate(pt.x, pt.y)
//       ctx.rotate(degrees * (Math.PI / 180))

//       //draw image from circles and restore
//       //ctxPen.drawImage(settings.canvasCircles,0, 0);
//       //ctxPen.restore();

//       handleDrawCircles()
//     }
//   }, [centerPosition, handleDrawCircles, iOffset, iPosition, circlesCanvasRef, penCanvasRef])

//   const handleResizeCanvas = useCallback(() => {
//     if (penCanvasRef.current && circlesCanvasRef.current) {
//       const offscreen = 100

//       //capture current draw state and pause drawing.
//       const drawing = draw
//       setDraw(false)

//       //we need to capture the current drawing and redraw when set
//       const ctx = penCanvasRef.current.getContext('2d')
//       const ctxCircles = circlesCanvasRef.current.getContext('2d')
//       const cd = ctx.getImageData(0, 0, canvasCirclesAndPenContainerSize.width, canvasCirclesAndPenContainerSize.height)

//       ctx.save()
//       ctxCircles.save()

//       // restore rotation
//       if (iPosition !== 0) {
//         const posHolder = iPosition
//         const offsetHolder = iOffset

//         setIOffset(iPosition * -1)

//         handleRotateDrawing()

//         setIOffset(offsetHolder)
//         setIPosition(posHolder)
//       }

//       if (draw === false) handleDrawCircles()
//       // ctx.putImageData
//       setDraw(drawing)
//     }
//   }, [draw, canvasCirclesAndPenContainerSize, iPosition, handleDrawCircles, iOffset, handleRotateDrawing])

//   const handleDrawCurve = useCallback(() => {
//     if (penCanvasRef.current) {
//       const ctx = penCanvasRef.current.getContext('2d')
//       ctx.beginPath()
//       ctx.strokeStyle = curveColor
//       ctx.lineWidth = curveWidth + 0.001
//       ctx.moveTo(refState.current.curvePoints[0].x, refState.current.curvePoints[0].y)
//       ctx.lineTo(refState.current.curvePoints[1].x, refState.current.curvePoints[1].y)
//       ctx.stroke()
//       ctx.closePath()
//     }
//   }, [curveColor, curveWidth, penCanvasRef])

//   const handleDraw = useCallback(() => {
//     //if we've cycled back to the beginning, then pause
//     if (
//       refState.current.curvePoints[1] &&
//       draw &&
//       i > iterator &&
//       refState.current.curvePoints[1].x === penStart.x &&
//       refState.current.curvePoints[1].y.toFixed(1) === penStart.y.toFixed(1)
//     ) {
//       const nd = new Date().getTime() / 1000
//       setTimer(nd - timer)
//       dispatch(setIsDraw(false))
//       setI(0)

//       // To do: check and add circle Reset to show circles as initial

//       handleDrawCircles()
//       return
//     }

//     //button hs been toggled
//     if (!draw) {
//       // To do: check and add circle Reset to show circles as initial
//       handleDrawCircles()
//       return
//     }

//     let c = 0
//     let stu

//     //adjust speed so 1 iteration per frame is the smallest we use
//     //if decimal is specified we add a timeout to the frame below.
//     if (speed < 1) {
//       stu = 1
//     } else {
//       stu = speed
//     }

//     //hide circles if we're going too fast -- To do

//     //run circles off for internal loop
//     // if (settings.circles === 'show') {
//     //   settings.circles = 'hide'
//     //   var circles = true
//     // }

//     //flag that a drawing exists in settings
//     //hard to detect if drawing is present on canvas otherwise.
//     setDrawing(true)

//     //loop through the speed iterations without a frame
//     //this should run at least once
//     while (c < stu) {
//       //if we've cycled back to the beginning, then pause
//       if (
//         refState.current.curvePoints[1] &&
//         draw &&
//         i > iterator &&
//         refState.current.curvePoints[1].x === penStart.x &&
//         refState.current.curvePoints[1].y.toFixed(1) === penStart.y.toFixed(1)
//       ) {
//         const nd = new Date().getTime() / 1000
//         setTimer(nd - timer)
//         setDraw(false)
//         setI(0)
//         // To do: check and add circle Reset to show circles as initial
//         break
//       }
//       // To do: check and add circle Reset to show circles as initial

//       handleDrawCircles()
//       handleDrawCurve()
//       //if we've done 1000 iterations, then call frame here, so there's some initial feedback
//       setI(i + iterator)
//       c = c + iterator
//     }

//     //draw
//     handleDrawCircles()
//     handleDrawCurve()

//     //if we're decimal on speed then create timeout
//     if (speed < 1) {
//       setTimeout(handleDraw, 10 / speed)
//     } else {
//       //or just request frame
//       requestAnimationFrame(handleDraw)
//     }
//   }, [dispatch, draw, handleDrawCircles, handleDrawCurve, i, iterator, penStart.x, penStart.y, speed, timer])

//   const handleClearCanvas = useCallback(() => {
//     const ctx = penCanvasRef.current.getContext('2d')
//     ctx.clearRect(0, 0, penCanvasRef.current.width, penCanvasRef.current.height)
//     setDrawing(false)
//   }, [])

//   const handleRestart = useCallback(() => {
//     setI(0)
//     handleDrawCircles()
//   }, [handleDrawCircles])

//   const handleReset = useCallback(() => {
//     if (iPosition !== 0) {
//       const temp = iOffset
//       setIOffset(iPosition)
//       handleRotateDrawing()
//       setIOffset(temp)
//       setIPosition(0)
//     }
//     handleDrawCircles()
//   }, [handleDrawCircles, handleRotateDrawing, iOffset, iPosition])

//   useEffect(() => {
//     if (draw === true) {
//       if (i === 0) {
//         setTimer(new Date().getTime() / 1000)
//       }
//       requestAnimationFrame(handleDraw)
//     }
//   }, [handleDraw, i, draw])

//   useEffect(() => {
//     if (isDraw !== draw) setDraw(isDraw)
//   }, [draw, isDraw])

//   useEffect(() => {
//     handleResizeCanvas()
//   }, [handleResizeCanvas])

//   return { divContainerRef, penCanvasRef, circlesCanvasRef, handleClearCanvas, handleRestart, handleReset }
// }
