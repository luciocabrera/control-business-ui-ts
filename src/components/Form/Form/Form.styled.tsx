import styled from 'styled-components';

export const FormStyled = styled.form`
  border-radius: 12px;
  background: var(--form-bg-color);
  -webkit-box-shadow: 6px 6px 22px 1px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 6px 6px 22px 1px rgba(0, 0, 0, 0.4);
  box-shadow: 6px 6px 22px 1px rgba (0, 0, 0, 0.4);
  z-index: 10;
  position: relative;
  max-width: 95%;
  max-height: 95vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  header {
    .close {
      right: 1.5rem;
      position: absolute;
    }
  }
  legend {
    font-weight: bold;
    color: var(--text-strong-color);
    margin-left: 8px;
    padding-left: 6px;
    padding-right: 6px;
    top: -2px;
    position: relative;
  }
  main {
    padding: 2rem 4rem;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: calc(100vh - 17rem);
  }
  footer {
    padding: 0.25rem 2rem;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    gap: 1rem;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 46%), 0 2px 10px 0 rgb(0 0 0 / 42%);
    align-content: center;
    align-items: center;
    flex-wrap: nowrap;
    background: linear-gradient(135deg, white 20%, #c2e5da8a 0%, rgb(239 216 165 / 53%) 100%);
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }
`;
export const FieldRowStyled = styled.fieldset`
  background: var(--form-bg-color);
  padding: 0;
  border: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  align-content: flex-start;
`;

export const FieldGroupStyled = styled.fieldset`
  background: var(--form-bg-color);
  padding: 1rem;
  border-radius: var(--border-radius);
  border-color: var(--border-color);
  border: 1px solid;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  flex: 1;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: flex-start;
  }
`;

export const CustomFieldWrapper = styled.div`
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
