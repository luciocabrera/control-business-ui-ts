import { ReactElement } from 'react';

import { OverlayStyled } from './Overlay.styled';

type OverlayProps = {
  children?: ReactElement | ReactElement[];
};

const Overlay = ({ children }: OverlayProps) => (
  <OverlayStyled>{children}</OverlayStyled>
);

Overlay.displayName = 'Overlay';

export default Overlay;
