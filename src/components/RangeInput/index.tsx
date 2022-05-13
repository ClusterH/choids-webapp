import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { FlexRow, InputWrapper } from 'styles/components'
import './style.css'

const RangeInput: React.FC<{ min?: number; max?: number; step?: number; defaultValue?: number; onChange: any }> = ({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 0,
  onChange,
}) => {
  const inputRef = useRef<any>()
  const [isChanging, setIsChanging] = useState(false)

  const getPercent = useMemo(() => (value: number) => ((value - min) / (max - min)) * 100, [max, min])

  const changeInputProgressPercentStyle = useCallback(() => {
    inputRef.current.style.setProperty('--webkitProgressPercent', `${getPercent(inputRef.current.value)}%`)
  }, [getPercent])

  useEffect(() => {
    changeInputProgressPercentStyle()
    const inputElement = inputRef.current

    const handleUpAndLeave = () => setIsChanging(false)
    const handleDown = () => setIsChanging(true)

    inputElement.addEventListener('mousemove', changeInputProgressPercentStyle)
    inputElement.addEventListener('mousedown', handleDown)
    inputElement.addEventListener('mouseup', handleUpAndLeave)
    inputElement.addEventListener('mouseleave', handleUpAndLeave)
    return () => {
      inputElement.removeEventListener('mousemove', changeInputProgressPercentStyle)
      inputElement.removeEventListener('mousedown', handleDown)
      inputElement.removeEventListener('mouseup', handleUpAndLeave)
      inputElement.removeEventListener('mouseleave', handleUpAndLeave)
    }
  }, [isChanging, changeInputProgressPercentStyle])

  useEffect(() => {
    if (!inputRef?.current) return
    changeInputProgressPercentStyle()
  }, [inputRef, changeInputProgressPercentStyle])

  return (
    <InputWrapper
      className="range"
      type="range"
      ref={inputRef}
      min={min}
      max={max}
      step={step}
      value={defaultValue}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  )
}

export default RangeInput
