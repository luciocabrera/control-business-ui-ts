import styled from 'styled-components';

export const NavStyled = styled.nav`
  width: 100%;
  background: linear-gradient(135deg, var(--header-bg-color) 0%, rgba(253, 187, 45, 1) 100%);
  ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    column-gap: 1.8rem;
    color: var(--nav-text-color);
    li {
      text-align: center;
      a {
        color: inherit;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-content: center;
        align-items: center;
        column-gap: 0.5rem;
        text-decoration: none;
      }
    }
  }
  img,
  svg {
    width: 24px;
  }
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.46), 0 2px 10px 0 rgba(0, 0, 0, 0.42);
  position: relative;
  display: flex;
  height: var(--navbar-root-height);
  font-family: '72override', var(--font-family);
  font-size: var(--font-size);
  font-weight: 400;
  box-sizing: border-box;

  #app-home {
    padding: 0 1.5rem;
  }
`;
