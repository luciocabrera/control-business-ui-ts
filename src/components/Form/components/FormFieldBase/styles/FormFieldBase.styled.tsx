import styled from 'styled-components';

export const FieldSetStyled = styled.div`
  min-width: 300px;
  width: ${({ width }: { width?: number; viewMode?: boolean }) =>
    width ?? 100}%;
  padding: 0;
  flex: auto;
  fieldset {
    align-content: stretch;
    background: var(--form-bg-color);
    padding: 0;
    border-radius: var(--border-radius);
    border-color: var(--border-color);
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
