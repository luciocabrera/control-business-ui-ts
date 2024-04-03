import styled from 'styled-components';

export const TextInputStyled = styled.input<{ textAlign?: string }>`
  width: calc(100% - 14px);
  border: none;

  text-align: ${({ textAlign }) => textAlign || 'left'};
  color: var(--color-2);
  border-radius: 10px;
  padding-left: 10px;
  top: -3px;
  position: relative;
  :focus-visible {
    outline: none;
    border: none;
  }
`;
