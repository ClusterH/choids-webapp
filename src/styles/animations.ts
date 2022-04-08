import styled, { css, keyframes } from 'styled-components'

const fadeInFrame = keyframes`
  0% {
    opacity: 0.3;
  }
  30% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
`
const fadeOutFrame = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`
const infiniteSliderFrame = keyframes`
  0% {
    transform: translate(0);
  }
  100% {
    transform: translate(-1228px); /* The image width */
  }
`

export const fadeInAnimation = css`
  animation: ${fadeInFrame} 0.3s ease-in-out;
`
export const fadeOutAnimation = css`
  animation: ${fadeOutFrame} 0.3s ease-in-out;
`
export const infinitSliderAnimation = css`
  animation: ${infiniteSliderFrame} 15s infinite linear;
`
