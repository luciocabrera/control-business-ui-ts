import styled from 'styled-components';

export const ContentStyled = styled.div`
  float: left;
  width: calc(100% - 42px - 2rem);
  margin-left: 42px;
  padding: 1rem;
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
