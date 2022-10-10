import styled from 'styled-components';

export const NavStyled = styled.nav`
  float: left;
  width: 42px;
  background: var(--form-bg-color); // #cccccc87; //  #ccc;
  color: var(--nav-text-color);
  position: absolute;
  height: calc(100% - 42.5px);
  ul {
    list-style-type: none;
    padding: 0;
    li {
      text-align: center;
      padding-bottom: 1rem;
    }
  }
  img,
  svg {
    width: 24px;
  }
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.46), 0 2px 10px 0 rgba(0, 0, 0, 0.42);
`;
