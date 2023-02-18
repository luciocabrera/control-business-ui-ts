import styled, { keyframes } from 'styled-components';

const spinner = keyframes`
  to {
     -webkit-transform: rotate(360deg);
     transform: rotate(360deg);
  }
`;

export const PageSpinnerStyled = styled.div`
  border-radius: 50%;
  border-top: 4px solid #03ade0;
  border-right: 2px solid transparent;
  -webkit-animation: ${spinner} 0.6s linear infinite;
  animation: ${spinner} 0.6s linear infinite;
  width: var(--spinner-lg);
  height: var(--spinner-lg);
  position: fixed;
  top: calc(50% - var(--spinner-lg) / 2);
  left: calc(50% - var(--spinner-lg) / 2);
`;
