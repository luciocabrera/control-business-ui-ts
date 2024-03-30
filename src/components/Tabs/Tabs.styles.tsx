import styled from 'styled-components';
export const Tab = styled.button<{ active: boolean }>`
  font-size: 20px;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;
export const ButtonGroup = styled.div`
  display: flex;
`;

export const TabsStyled = styled.div`
  width: 100%;
  height: 100%;
  z-index: 999;
  position: relative;
  display: flex;
  margin: 0;
  left: 0;
  top: 0;
  flex-direction: column;
`;
