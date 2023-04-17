import { useEffect, useState } from 'react';

export const getSize = (isClient: boolean) => ({
  width: isClient ? window.innerWidth : undefined,
  height: isClient ? window.innerHeight : undefined,
});

export const useWindowSize = () => {
  const isClient = typeof window === 'object';

  const [windowSize, setWindowSize] = useState(getSize(isClient));

  useEffect(() => {
    if (!isClient) {
      return;
    }

    const handleResize = () => {
      setWindowSize(getSize(isClient));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isClient]); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
};
