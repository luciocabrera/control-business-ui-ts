import { useEffect, useState } from 'react';
import { useDebounce } from 'hooks';

const getSize = (htmlRef: React.RefObject<HTMLElement>) => ({
  clientHeight: htmlRef?.current?.clientHeight,
  clientWidth: htmlRef?.current?.clientWidth,
});

/**
 *
 * @param htmlRef The element's reference
 * @returns The client width and height of the element
 */

export const useElementSize = (htmlRef: React.RefObject<HTMLElement>) => {
  const [windowSize, setWindowSize] = useState(getSize(htmlRef));

  const handleResize = () => {
    setWindowSize(getSize(htmlRef));
  };

  const debouncedHandleResize = useDebounce(handleResize, 500);
  useEffect(() => {
    window.addEventListener('resize', debouncedHandleResize);

    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, [debouncedHandleResize]);

  return windowSize;
};
