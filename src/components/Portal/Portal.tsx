import { ReactElement, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children?: ReactElement | ReactElement[];
  el?: string;
};

export const Portal = ({ children, el = 'fragment' }: PortalProps) => {
  const [container] = useState(document.createElement(el));

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(children, container);
};

export default Portal;
