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
    background: transparent;
    cursor: pointer;
    width: 22px;
    border-radius: 50%;
    height: 22px;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    flex-direction: row;
    color: #1b4734;
    border: solid 1px #1b4734;
    :hover {
      opacity: 0.6;
      border: solid 1px rgb(157 105 34);
    }
    span {
      font-size: 0.85rem;
      display: flex;
    }
  }
  svg {
    height: 1rem;
    width: 1rem;
  }
`;
