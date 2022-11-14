import styled from 'styled-components';

export const TableStyled = styled.div`
  [role='grid'] {
    height: ${({ height }: { height?: string; useRadius?: boolean }) => (height ? height : 'inherit')};
  }
`;
