import styled from 'styled-components';

const border = ({ isTable }: { isTable?: boolean }) =>
  isTable
    ? ` border-top:  1px solid transparent;
        border-right:  1px solid transparent;
        border-left:  1px solid transparent;`
    : ``;

export const HeaderStyled = styled.header`
  display: flex;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-top-left-radius: 12px;
  gap: 1rem;
  border-top-right-radius: 12px;
  padding: 0.4rem 1.2rem;
  justify-content: flex-start;
  flex-direction: row;

  background: linear-gradient(white, white), linear-gradient(to right, #03542f 0%, #d19000 100%);
  border-bottom: 2px solid transparent;
  background-repeat: no-repeat;
  background-origin: padding-box, border-box;

  ${border}
  img {
    height: 2rem;
    width: 2rem;
  }
  h1 {
    margin: 0;
    font-size: 1.5rem;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  #children-content {
    text-align: right;
  }
  #title-content {
    background: linear-gradient(to right, #03542f 0%, #d19000 100%);
    -webkit-background-clip: text;
  }
  button {
    right: 1.5rem;
    position: absolute;
  }
`;
