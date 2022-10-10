import styled from 'styled-components';

const customStyles = ({ inverse }: { inverse: boolean }) => {
  if (inverse) {
    return `background: var(--special-text-color);
    color:  rgb(157 105 34);
    border: solid 1px rgb(157 105 34);`;
  } else {
    return `background: rgb(157 105 34);
    color: var(--special-text-color);
    border: solid 1px var(--special-text-color);`;
  }
};

export const ButtonStyled = styled.button`
  border-radius: var(--border-radius);
  padding: 0.5rem 1rem;
  cursor: pointer;
  border: 1px;

  :hover {
    opacity: 0.6;
    border: solid 1px rgb(157 105 34);
  }

  ${customStyles}
`;
