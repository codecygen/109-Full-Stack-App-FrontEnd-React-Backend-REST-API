import { useState, useLayoutEffect } from "react";

const getWindowSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize);

  useLayoutEffect(() => {
    const handleResize = () => {
      setWindowSize(getWindowSize);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;
