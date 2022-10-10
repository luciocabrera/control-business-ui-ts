import styled from 'styled-components';

export const TextInputStyled = styled.input`
  width: calc(100% - 14px);
  border: none;
  background: var(--form-bg-color);
  color: var(--text-color);
  height: 1.5rem;
  border-radius: 10px;
  padding-left: 10px;
  top: -2px;
  position: relative;
  :focus-visible {
    outline: none;
    background: var(--input-focus-color);
    color: var(--special-shadow-color);
  }
`;
