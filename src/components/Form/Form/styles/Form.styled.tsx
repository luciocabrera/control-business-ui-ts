import styled from 'styled-components';

export const FormStyled = styled.form`
  container-type: inline-size;
  container-name: form-container;
  border-radius: 12px;
  background: var(--form-bg-color);
  box-shadow: 6px 6px 22px 1px rgba(0, 0, 0, 0.4);
  z-index: 10;
  position: relative;
  ${({ width }: { width?: string }) => (width ? `width: ${width}` : ``)};
  ${({ height }: { width?: string; height?: string }) => (height ? `height: ${height}` : ``)};
  max-width: 95%;
  max-height: 95%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;

  fieldset {
    min-width: 300px;
  }
  header {
    min-height: 40px;
    max-height: 40px;
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
    flex-grow: 1;
  }
  footer {
    padding: 0.25rem 2rem;
    display: flex;
    gap: 1rem;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 46%), 0 2px 10px 0 rgb(0 0 0 / 42%);
    align-content: center;
    align-items: center;
    flex-wrap: nowrap;
    background: linear-gradient(135deg, white 20%, #c2e5da 0%, rgb(237 224 194) 100%);
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }
`;
