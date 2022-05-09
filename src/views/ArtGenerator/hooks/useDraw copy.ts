import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

// import { useArtParamSettings, useIsDraw } from 'state/artGenerator/hook'

// import { IPoint } from '../types'
// import { calcAngle, calcRotorCenterPosition } from '../utils/drawHelper'

// export const useDraw = () => {
//   const brushCanvasRef: any = useRef<HTMLCanvasElement>()
//   const outerCircleCanvasRef: any = useRef<HTMLCanvasElement>()
//   const innerCircleCanvasRef: any = useRef<HTMLCanvasElement>()

//   const [circleChanges, setCircleChanges] = useState<boolean>(true)
//   const [iterator, setIterator] = useState<number>(0)

//   const artParamSettings = useArtParamSettings()

//   console.log(artParamSettings)

//   const width = 800
//   const height = 800
//   const segment = 0.002
//   const radians = useMemo(() => [0, 0, 0, 0], [])

//   // handleLength
//   const pencilDistance = useMemo(() => artParamSettings[0].pencilDistance, [artParamSettings])
//   const pointSpeed = useMemo(() => artParamSettings[0].speed / 1000, [artParamSettings])

//   const statorColor: IPoint = useMemo(() => {
//     return {
//       x: width / 2,
//       y: height / 2,
//       r: artParamSettings[0].statorRadius,
//       color: artParamSettings[0].statorColor,
//       fill: false,
//     }
//   }, [artParamSettings])

//   const innerCircles: IPoint[] = useMemo(() => {
//     const circles = artParamSettings[0].rotors.map((rotor, index) => {
//       const circle = {
//         ...calcRotorCenterPosition(
//           calcAngle(artParamSettings[0].speed),
//           index === 0 ? artParamSettings[0].statorRadius : artParamSettings[0].rotors[index - 1].r,
//           rotor.r,
//           rotor.isInner
//         ),
//         color: artParamSettings[0].rotorColor,
//         fill: false,
//         r: rotor.r,
//       }

//       return circle
//     })

//     return circles
//   }, [pointSpeed])

//   const currentPoint: IPoint = useMemo(() => {
//     return {
//       x: null,
//       y: null,
//       r: artParamSettings[0].pencilSize,
//       color: artParamSettings[0].pencilColor,
//       fill: true,
//       speed: pointSpeed,
//     }
//   }, [artParamSettings, pointSpeed])

//   const points = useMemo(
//     () => [currentPoint, outerCircle, { ...innerCircle }, { ...innerCircle, r: innerCircle.r / 2, speed: pointSpeed - speedIncrement }],
//     [currentPoint, innerCircle, outerCircle, pointSpeed]
//   )

//   const isDraw = useIsDraw()

//   const handleAddCircle = useCallback(() => {
//     const brushCtx = brushCanvasRef.current.getContext('2d')
//     brushCtx.clearRect(0, 0, brushCanvasRef.width, brushCanvasRef.height)
//     radians.push(0)
//     const smallestCircle = points[points.length - 1]
//     points.push({ ...smallestCircle, r: smallestCircle.r / 2, speed: smallestCircle.speed! + speedIncrement })

//     setCircleChanges(true)
//     setTimeout(() => setCircleChanges(false), 50)
//   }, [points, radians])

//   /**
//    * Remove the smallest circle from the spirograph.
//    */
//   const handleRemoveCircle = useCallback(() => {
//     const brushCtx = brushCanvasRef.current.getContext('2d')
//     brushCtx.clearRect(0, 0, brushCanvasRef.width, brushCanvasRef.height)
//     radians.pop()
//     points.pop()

//     setCircleChanges(true)
//     setTimeout(() => setCircleChanges(false), 50)
//   }, [points, radians])

//   const handleDrawCircle = useCallback((point: IPoint, ctx: any) => {
//     if (!ctx) return
//     ctx.beginPath()
//     ctx.arc(point.x!, point.y!, point.r, 0, 2 * Math.PI)
//     if (point.fill) {
//       ctx.fillStyle = point.color
//       ctx.fill()
//     }
//     ctx.strokeStyle = point.color
//     ctx.stroke()
//   }, [])

//   const handleDrawBrush = useCallback(
//     (i, point, canvas, context, outer, refresh, reverse, background) => {
//       const r = radians[i]
//       point.x = outer.x + outer.r * Math.cos(r)
//       point.y = outer.y + outer.r * Math.sin(r)

//       let increment = 2 * Math.PI * point.speed
//       if (reverse) increment = -1 * increment
//       radians[i] = r + increment === 2 * Math.PI ? 0 : r + increment

//       if (refresh) context.clearRect(0, 0, canvas.width, canvas.height)
//       handleDrawCircle(point, context)
//     },
//     [handleDrawCircle, radians]
//   )

//   // drawing curve
//   const handleDrawStroke = useCallback(
//     (i, point, canvas, context, outer, refresh, reverse, background) => {
//       const r = radians[i]
//       const oldX = point.x
//       const oldY = point.y
//       point.x = outer.x + outer.r * Math.cos(r)
//       point.y = outer.y + outer.r * Math.sin(r)

//       let increment = 2 * Math.PI * point.speed
//       if (reverse) increment = -1 * increment
//       radians[i] = r + increment === 2 * Math.PI ? 0 : r + increment

//       if (!context) return

//       if (refresh) context.clearRect(0, 0, canvas.width, canvas.height)

//       if (!circleChanges) {
//         context.beginPath()
//         context.moveTo(oldX, oldY)
//         context.lineTo(point.x, point.y)
//         context.strokeStyle = point.color
//         context.lineWidth = point.r
//         context.stroke()
//       }
//     },
//     [circleChanges, radians]
//   )

//   const handleDrawHandle = useCallback(
//     (outerCircle: IPoint, context: CanvasRenderingContext2D) => {
//       if (!context) return
//       context.beginPath()
//       context.moveTo(outerCircle.x!, outerCircle.y!)
//       context.lineTo(outerCircle.x! + pencilDistance * Math.cos(radians[0]), outerCircle.y! + pencilDistance * Math.sin(radians[0]))
//       context.stroke()
//     },
//     [pencilDistance, radians]
//   )

//   const handleDrawInnerCircles = useCallback(
//     (points: any) => {
//       const innerCircleCtx = innerCircleCanvasRef.current?.getContext('2d')

//       innerCircleCtx?.clearRect(0, 0, innerCircleCanvasRef.current?.width!, innerCircleCanvasRef.current?.height!)
//       for (let i = 2; i < points.length; i++) {
//         handleDrawBrush(
//           i,
//           points[i],
//           innerCircleCanvasRef,
//           innerCircleCtx,
//           { ...points[i - 1], r: points[i - 1].r - points[i].r },
//           false,
//           false,
//           true
//         )
//       }

//       // Draw brush handle
//       handleDrawHandle(points[points.length - 1], innerCircleCtx!)
//     },
//     [handleDrawBrush, handleDrawHandle]
//   )

//   const requestAnimFram = ((callback) => {
//     return (callback: any) => {
//       window.setTimeout(callback, 1000 / 60)
//     }
//   })()

//   const handleAnimation = useCallback(
//     (points) => {
//       // Draw brush stroke
//       const brushCtx = brushCanvasRef.current?.getContext('2d')
//       handleDrawStroke(
//         0,
//         points[0],
//         brushCanvasRef,
//         brushCtx,
//         { ...points[points.length - 1], r: pencilDistance, speed: points[points.length - 1].speed },
//         false,
//         true,
//         false
//       )

//       handleDrawInnerCircles(points)

//       requestAnimFram(() => handleAnimation(points))
//     },
//     [handleDrawInnerCircles, handleDrawStroke, pencilDistance, requestAnimFram]
//   )

//   useEffect(() => {
//     const outerCircleCtx = outerCircleCanvasRef.current?.getContext('2d')
//     handleDrawCircle(outerCircle, outerCircleCtx!)

//     handleDrawInnerCircles(points)

//     if (isDraw) {
//       handleAnimation(points)

//       setTimeout(() => setCircleChanges(false), 100)
//     }
//   }, [handleAnimation, handleDrawCircle, handleDrawInnerCircles, isDraw, outerCircle, points])

//   return { brushCanvasRef, outerCircleCanvasRef, innerCircleCanvasRef }
// }
