import styled from 'styled-components';

export const TableActionsStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
  gap: 1rem;
  margin-left: 0.2rem;
  border: none;

  a {
    display: flex;
  }
  svg {
    height: 1rem;
    width: 1rem;
  }
`;
