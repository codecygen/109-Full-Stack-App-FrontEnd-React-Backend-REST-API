import { useContext } from "react";
import { NavLink } from "react-router-dom";

import MenuIcon from "./MenuIcon";

import MobileMenuContext from "../store/context-api/mobile-menu-context";

import useWindowSize from "../hooks/use-windowSize";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpa,
  faCommentDots,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./NavBar.module.scss";

const NavBar = () => {
  const mobileMenuCtx = useContext(MobileMenuContext);
  const windowSize = useWindowSize();

  const highlightButton = (linkState) =>
    linkState.isActive ? classes.active : "";

  const mobileMenuClasses = mobileMenuCtx.menuState
    ? `${classes["mobile-menu"]} ${classes["mobile-menu-open"]}`
    : classes["mobile-menu"];

  const menuLinkClickHandler = () => {
    mobileMenuCtx.toggleMenuState();
  };

  let leftSideAppName;
  let rightSideNavBarContent;

  if (windowSize.width < 700) {
    leftSideAppName = <span className={classes["app-name"]}></span>;
    rightSideNavBarContent = <MenuIcon />;
  } else {
    leftSideAppName = <span className={classes["app-name"]}>Message App</span>;

    rightSideNavBarContent = (
      <>
        <li>
          <NavLink
            className={highlightButton}
            to="/"
            style={{ lineHeight: "1" }}
          >
            Feed
          </NavLink>
        </li>

        <li>
          <NavLink
            className={highlightButton}
            to="/login"
            style={{ lineHeight: "1" }}
          >
            Logout
          </NavLink>
        </li>
      </>
    );
  }

  const mobileMenuContent = (
    <div className={mobileMenuClasses}>
      <ul>
        <li onClick={menuLinkClickHandler}>
          <NavLink
            className={highlightButton}
            to="/"
            style={{ lineHeight: "1" }}
          >
            <FontAwesomeIcon icon={faCommentDots} />
            <span>Feed</span>
          </NavLink>
        </li>
        <li onClick={menuLinkClickHandler}>
          <NavLink
            className={highlightButton}
            to="/login"
            style={{ lineHeight: "1" }}
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            <span>Logout</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );

  return (
    <section>
      <div className={classes["top-padding"]}></div>
      <main className={`${classes.navbar}`}>
        <ul>
          <li>
            <NavLink to="/">
              <FontAwesomeIcon
                icon={faSpa}
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
