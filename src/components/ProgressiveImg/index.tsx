import React, { useState, useEffect, useCallback } from 'react'

import styled from 'styled-components'

import { ImageContainer } from 'styles/components'
import { themeBorderRadius } from 'styles/theme'

const ImgWrapper = styled(ImageContainer)<{ isShadow?: boolean }>`
  filter: ${({ isShadow }) => (isShadow ? 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25))' : 'none')};
`

const ProgressiveImg: React.FC<{
  placeholderSrc: string
  src: string
  width: string
  height: string
  borderRadius?: string
  isShadow?: boolean
}> = ({ placeholderSrc, src, ...props }) => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src)

  const handleOnLoad = useCallback(() => {
    const img = new Image()
    img.src = src
    img.onload = () => {
      setImgSrc(src)
    }
  }, [src])

  useEffect(() => {
    handleOnLoad()

    return () => {
      setImgSrc('')
    }
  }, [handleOnLoad])

  return (
    <ImgWrapper
      {...{ src: imgSrc, ...props }}
      alt={'image'}
      width={props.width}
      height={props.height}
      isShadow={props.isShadow}
      borderRadius={props.borderRadius}
    />
  )
}
export default ProgressiveImg
