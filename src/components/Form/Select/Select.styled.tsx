import styled from 'styled-components';

export const SelectStyled = styled.select`
  width: 100%;
  border: none;
  background: var(--form-bg-color);
  color: var(--text-color);
  border-radius: var(--border-radius);
  padding-left: 10px;
  border-radius: 10px;
  top: -3px;
  position: relative;
  :focus-visible {
    outline: none;
    background: var(--input-focus-color);
    color: var(--special-shadow-color);
  }
`;
