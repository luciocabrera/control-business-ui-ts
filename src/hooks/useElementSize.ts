import { useDebounce } from 'hooks';
import { useState, useEffect } from 'react';

const getSize = (htmlRef: React.RefObject<HTMLElement>) => ({
  clientWidth: htmlRef?.current?.clientWidth,
  clientHeight: htmlRef?.current?.clientHeight,
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
  }, [debouncedHandleResize, htmlRef]);

  return windowSize;
};
