import { useState, useEffect } from "react";

// This is to control blinking event so that css styles can be updated
// when a data entered is updated or successfully received by backend.
const useBlink = (defaultStyle, blinkAnimationStyle) => {
  const [currentStyle, setCurrentStyle] = useState(defaultStyle);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setCurrentStyle(defaultStyle);
    }, 500);

    return () => {
      clearTimeout(timeOut);
    };
  }, [defaultStyle, currentStyle]);

  const blinkHandler = () => {
    setCurrentStyle(`${defaultStyle} ${blinkAnimationStyle}`);
  };

  return {
    currentStyle,
    blinkHandler,
  };
};

export default useBlink;
