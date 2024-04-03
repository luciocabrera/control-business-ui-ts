import styled from 'styled-components';

export const FieldSetStyled = styled.div<{
  width?: number;
  viewMode?: boolean;
}>`
  min-width: 300px;
  width: ${({ width }) => width ?? 100}%;
  padding: 0;
  flex: auto;
  fieldset {
    align-content: stretch;
    padding: 0;
    border-radius: var(--border-radius);
    color: var(--color-2);
    border: 1px solid;
    display: flex;
    :focus-within {
      background: var(--input-focus-color);
      border-color: var(--special-shadow-color);
      color: var(--special-shadow-color);
      legend {
        color: var(--special-shadow-color);
      }
    }

    & select:focus-visible,
    input:focus-visible {
      outline: none;
    }

    & select:focus,
    input:focus {
      outline: none;
    }
  }
`;

export const HelperTextContainer = styled.span`
  font-size: 12px;
  line-height: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 16px;
  padding: 4px 10px 0px 10px;
`;

export const ErrorContainer = styled.span`
  color: red;
`;
