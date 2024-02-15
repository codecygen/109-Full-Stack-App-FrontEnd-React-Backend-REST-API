import { useRef, useEffect, useContext, useCallback } from "react";
import { NavLink } from "react-router-dom";

import MenuIcon from "./MenuIcon";

import MobileMenuContext from "../store/context-api/mobile-menu-context";

import useAuth from "../hooks/use-auth";
import useWindowSize from "../hooks/use-windowSize";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFutbol,
  faMedal,
  faArrowRightFromBracket,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./NavBar.module.scss";

const NavBar = () => {
  const { token } = useAuth();

  const mobileMenuCtx = useContext(MobileMenuContext);
  const windowSize = useWindowSize();

  const clickRef = useRef(null);

  const highlightButton = (linkState) =>
    linkState.isActive ? classes.active : "";

  const mobileMenuClasses = mobileMenuCtx.menuState
    ? `${classes["mobile-menu"]} ${classes["mobile-menu-open"]}`
    : classes["mobile-menu"];

  const menuCloseHandler = () => {
    mobileMenuCtx.toggleMenuState();
  };

  const outsideNavbarClickHandler = useCallback(
    (e) => {
      if (clickRef.current && !clickRef.current.contains(e.target)) {
        mobileMenuCtx.closeMenuState();
      }
    },
    [mobileMenuCtx]
  );

  let leftSideAppName;
  let rightSideNavBarContent;

  if (windowSize.width < 700) {
    leftSideAppName = <span className={classes["app-name"]}></span>;
    rightSideNavBarContent = <MenuIcon />;
  } else {
    leftSideAppName = <span className={classes["app-name"]}>Soccer Club</span>;

    rightSideNavBarContent = (
      <>
        <li>
          <NavLink
            className={highlightButton}
            to="/"
            style={{ lineHeight: "1" }}
          >
            Events
          </NavLink>
        </li>

        <li>
          <NavLink
            className={highlightButton}
            to="/login"
            style={{ lineHeight: "1" }}
          >
            {token ? "Logout" : "Login"}
          </NavLink>
        </li>
      </>
    );
  }

  const mobileMenuContent = (
    <div className={mobileMenuClasses}>
      <ul>
        <li onClick={menuCloseHandler}>
          <NavLink
            className={highlightButton}
            to="/"
            style={{ lineHeight: "1" }}
          >
            <FontAwesomeIcon icon={faMedal} />
            <span> Events</span>
          </NavLink>
        </li>
        <li onClick={menuCloseHandler}>
          <NavLink
            className={highlightButton}
            to="/login"
            style={{ lineHeight: "1" }}
          >
            {token ? (
              <>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                <span> Logout</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faArrowRightToBracket} />
                <span> Login</span>
              </>
            )}
          </NavLink>
        </li>
      </ul>
    </div>
  );

  useEffect(() => {
    document.addEventListener("click", outsideNavbarClickHandler);

    return () =>
      document.removeEventListener("click", outsideNavbarClickHandler);
  }, [outsideNavbarClickHandler]);

  return (
    <section ref={clickRef}>
      <div className={classes["top-padding"]}></div>
      <main className={`${classes.navbar}`}>
        <ul>
          <li>
            <NavLink to="/">
              <FontAwesomeIcon
                icon={faFutbol}
                size="xl"
                style={{ verticalAlign: "middle" }}
              />
              {leftSideAppName}
            </NavLink>
          </li>
        </ul>

        <ul className={classes["right-group"]}>{rightSideNavBarContent}</ul>
      </main>

      {windowSize.width < 700 && mobileMenuContent}
    </section>
  );
};

export default NavBar;
