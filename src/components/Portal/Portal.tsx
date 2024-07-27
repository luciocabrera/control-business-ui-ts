import { type ReactPortal } from 'react';
import { createPortal } from 'react-dom';

import type { TPortalProps } from './Portal.types';

const Portal = ({ children }: TPortalProps): ReactPortal => {
  const appEl = document.getElementById('root') as DocumentFragment | Element;

  return createPortal(children, appEl) as ReactPortal;
};

export default Portal;
