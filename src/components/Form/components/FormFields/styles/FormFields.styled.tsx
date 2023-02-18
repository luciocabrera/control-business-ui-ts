import styled from 'styled-components';

export const FieldRowStyled = styled.fieldset`
  background: var(--form-bg-color);
  padding: 0;
  border: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  align-content: flex-start;
  min-width: 300px;
`;

export const FieldGroupStyled = styled.fieldset`
  background:var(--form-bg-color);
  padding: 0.5rem;
  border-radius: var(--border-radius);
  border-color: var(--border-color);
  border: 1px solid;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: flex-start;
  min-width: 300px;
  }
`;

export const CustomFieldWrapper = styled.div`
  container-type: inline-size;
  background: var(--form-bg-color);
  padding: 0;
  border: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: ${({ width }: { width?: number }) => width || '100'}%;
  align-content: flex-start;
  align-items: flex-start;
`;
