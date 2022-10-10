import styled from 'styled-components';

export const SelectStyled = styled.select`
  width: 100%;
  border: none;
  background: var(--form-bg-color);
  color: var(--text-color);
  height: 1.5rem;
  border-radius: var(--border-radius);
  padding-left: 10px;
  top: -2px;
  position: relative;

  :focus-visible {
    outline: none;
    background: var(--input-focus-color);
    color: var(--special-shadow-color);
  }
`;
