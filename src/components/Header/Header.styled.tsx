import styled from 'styled-components';

export const HeaderStyled = styled.header`
  display: flex;
  gap: 1rem;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;

  padding: 0 1.5rem;
  padding: 0.4rem 1.2rem;
  justify-content: flex-start;

  font-family: '72override', var(--font-family);
  font-size: var(--font-size);
  font-weight: 400;
  height: 40px;

  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 46%), 0 2px 10px 0 rgb(0 0 0 / 42%);

  img {
    height: 2rem;
    width: 2rem;
  }
  h1,
  span {
    margin: 0;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .children-content {
    text-align: right;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    align-content: center;
    flex-direction: row;
    gap: 1rem;
  }

  border-top: 1px solid transparent;
  border-right: 1px solid transparent;
  border-left: 1px solid transparent;
  border-bottom: 2px solid transparent;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-repeat: no-repeat;
  background-origin: padding-box, border-box;
  background: linear-gradient(135deg, white 20%, #c2e5da8a 0%, rgb(239 216 165 / 53%) 100%);
  height: var(--navbar-root-height);
  font-family: '72override', var(--font-family);
  font-size: var(--large-font-size);
  font-weight: 600;
  max-height: 40px;
  padding: 0 1.5rem;
  border: 1px solid grey;
  color: var(--header-bg-color);

  .title-content {
    background: linear-gradient(to right, #03542f 0%, #d19000 100%);
    -webkit-background-clip: text;
  }
`;
