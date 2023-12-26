import { useContext } from "react";

import MobileMenuContext from "../store/context-api/mobile-menu-context";

import classes from "./MenuIcon.module.scss";

const MenuIcon = () => {
  const mobileMenuCtx = useContext(MobileMenuContext);

  const menuClickHandler = () => {
    mobileMenuCtx.toggleMenuState();
  };

  const testClasses = mobileMenuCtx.menuState
    ? `${classes["nav-icon2"]} ${classes.open}`
    : classes["nav-icon2"];

  return (
    <div className={testClasses} onClick={menuClickHandler}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default MenuIcon;
