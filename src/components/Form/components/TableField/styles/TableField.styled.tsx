import styled from 'styled-components';

export const TableFieldStyled = styled.input`
  width: calc(100% - 14px);
  border: none;
  color: var(--color-2);
  border-radius: 10px;
  padding-left: 10px;
  top: -5px;
  position: relative;
  :focus-visible {
    outline: none;
    border: none;
  }
`;
