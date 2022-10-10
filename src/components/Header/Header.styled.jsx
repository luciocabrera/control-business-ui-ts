import styled from 'styled-components';

export const HeaderStyled = styled.header`
  background: linear-gradient(135deg, rgba(34, 193, 195, 1) 0%, rgba(253, 187, 45, 1) 100%);
  display: flex;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-top-left-radius: 12px;
  gap: 1rem;
  border-top-right-radius: 12px;
  padding: 0.4rem 1.2rem;
  color: var(--special-text-color);
  text-shadow: 1px 1px #042262;
  img {
    height: 2rem;
    width: 2rem;
  }
  h1 {
    margin: 0;
    font-size: 2rem;
  }
  #children-content {
    text-align: right;
  }
  #title-content {
    flex-grow: 1;
  }
`;
