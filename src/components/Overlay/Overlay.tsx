// react
import { memo, ReactElement } from 'react';
// styles
import { OverlayStyled } from './Overlay.styled';

type OverlayProps = {
  children?: ReactElement | ReactElement[];
};

const Overlay = memo(({ children }: OverlayProps) => <OverlayStyled>{children}</OverlayStyled>);

export default Overlay;
