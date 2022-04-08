import styled, { css } from 'styled-components';

export const AlertContent = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AlertMessage = styled.div`
  flex-grow: 1;
  margin-left: 18px;
  font-size: 1rem;
  font-weight: 400;
`;

export const AlertWrapper = styled.div`
  position: fixed;
  top: -60px;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in;
  animation-name: enter;
  animation-duration: 0.5s;
  animation-delay: 0.1s;
  left: calc(50% - 300px);
  width: 600px;
  height: 42px;
  border: 1px solid black;
  border-radius: 4px;
  z-index: 20000;
  padding: 8px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${(props) =>
    props.variant === 'primary' &&
    css`
      background: #1266f1;
      color: white;
    `};
  ${(props) =>
    props.variant === 'secondary' &&
    css`
      background: #b23cfd;
      color: white;
    `};
  ${(props) =>
    props.variant === 'success' &&
    css`
      background: #00b74a;
      color: white;
    `};
  ${(props) =>
    props.variant === 'danger' &&
    css`
      background: #f93154;
      color: white;
    `};
  ${(props) =>
    props.variant === 'warning' &&
    css`
      background: #ffa900;
      color: white;
    `};
  ${(props) =>
    props.variant === 'info' &&
    css`
      background: #39c0ed;
      color: white;
    `};
  ${(props) =>
    props.variant === 'light' &&
    css`
      background: #fbfbfb;
      color: white;
    `};
  ${(props) =>
    props.variant === 'dark' &&
    css`
      background: ##f93154;
      color: white;
    `};
  @keyframes enter {
    from {
      top: -60px;
    }
    to {
      top: 16px;
    }
  }
  @media screen and (max-width: 640px) {
    width: 320px;
    left: calc(50% - 180px);
  }
`;

export const AlertIcon = styled.span`
  position: relative;
  display: inline-block;
  width: ${(props) => props.size || props.width || '1rem'};
  height: ${(props) => props.size || props.height || '1rem'};
  background-color: ${({ background }) => background || 'transparent'};
  &:before {
    content: '';
    mask-image: ${({ icon, selected, selectedIcon }) =>
      `url(${selected ? selectedIcon || icon : icon})`};
    mask-size: ${(props) => props.size || '1rem'};
    background-repeat: no-repeat;
    width: ${(props) => props.size || '1rem'};
    background-color: ${({ color, selected, selectedColor }) =>
      selected ? selectedColor || color : color};
    height: ${(props) => props.size || '1rem'};
    position: absolute;
    top: ${(props) => `calc(50% - ${props.size || '1rem'}/2)`};
    left: ${(props) => `calc(50% - ${props.size || '1rem'}/2)`};
  }
`;
