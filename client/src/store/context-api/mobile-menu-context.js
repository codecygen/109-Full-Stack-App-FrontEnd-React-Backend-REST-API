import React, { useState } from "react";

const MobileMenuContext = React.createContext({
  menuState: false,
  toggleMenuState: () => {},
  closeMenuState: () => {},
});

export const MobileMenuContextProvider = (props) => {
  const [menuState, setMenuState] = useState(false);

  const toggleState = () => {
    setMenuState((prevValue) => !prevValue);
  };

  const closeState = () => {
    setMenuState((prevValue) => {
      if (!prevValue) {
        return false;
      }
    });
  };

  const outputValues = {
    menuState: menuState,
    toggleMenuState: toggleState,
    closeMenuState: closeState,
  };

  return (
    <MobileMenuContext.Provider value={outputValues}>
      {props.children}
    </MobileMenuContext.Provider>
  );
};

export default MobileMenuContext;
