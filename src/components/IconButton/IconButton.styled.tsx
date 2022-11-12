import styled from 'styled-components';

export const ButtonStyled = styled.button`
  background: transparent;
  cursor: pointer;
  width: 24px;
  border-radius: 50%;
  height: 24px;
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
`;
// background: rgb(172 189 100 / 18%);
