import styled from 'styled-components';

export const ContentStyled = styled.div`
  padding: 1rem 1.5rem;
  width: calc(100% - 3rem);
  height: calc(100% - 4.5rem);
`;

export const HeaderStyled = styled.header`
  background-color: var(--header-bg-color);
  z-index: 1;
  position: relative;
  padding: 10px;
  font-size: larger;
  color: white;
  font-weight: bolder;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.46), 0 2px 10px 0 rgba(0, 0, 0, 0.42);
`;
