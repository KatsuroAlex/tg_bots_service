import { createContext, useContext, useState, useEffect } from 'react';
import { WIDTH_SCREEN_768 } from '../utils/constants';

const WindowSizeContext = createContext();

WindowSizeContext.displayName = 'Context for Mobile size (max 480px)';

export const useWindowSize = () => {
  return useContext(WindowSizeContext);
};

const WindowSizeProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= WIDTH_SCREEN_768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= WIDTH_SCREEN_768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <WindowSizeContext.Provider value={isMobile}>
      {children}
    </WindowSizeContext.Provider>
  );
};

export default WindowSizeProvider;
