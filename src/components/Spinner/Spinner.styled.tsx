import styled, { keyframes } from 'styled-components';

const sizeSpinner = ({ size }: { size: string }) => {
  switch (size) {
    case 'md':
      return `height: 5rem;
            width: 5rem;`;
    case 'lg':
      return `height: 10rem;
            width: 10rem;`;
    case 'sm':
    default:
      return `height: 1rem;
            width: 1rem;`;
  }
};

const spinner = keyframes`
  to {
     -webkit-transform: rotate(360deg);
    transform: rotate(360deg);

  }
`;

export const SpinnerStyled = styled.div<{ size: string }>`
  ${sizeSpinner}
  border-radius: 50%;
  border-top: 2px solid #03ade0;
  border-right: 2px solid transparent;
  -webkit-animation: ${spinner} 0.6s linear infinite;
  animation: ${spinner} 0.6s linear infinite;
  :not(:required):before {
    border-radius: 50%;
    -webkit-animation: ${spinner} 0.6s linear infinite;
    animation: ${spinner} 0.6s linear infinite;
  }
`;
