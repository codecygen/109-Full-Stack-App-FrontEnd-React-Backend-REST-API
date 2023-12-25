import React, { useState } from "react";

const MobileMenuContext = React.createContext({
  menuState: false,
  changeMenuState: () => {},
});

export const MobileMenuContextProvider = (props) => {
  const [menuState, setMenuState] = useState(false);

  const changeState = () => {
    setMenuState(prevValue => !prevValue);
  };

  const outputValues = {
    menuState: menuState,
    changeMenuState: changeState,
  };

  return (
    <MobileMenuContext.Provider value={outputValues}>
      {props.children}
    </MobileMenuContext.Provider>
  );
};

export default MobileMenuContext;
