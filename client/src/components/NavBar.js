import { NavLink } from "react-router-dom";

import MenuIcon from "./MenuIcon";

import useWindowSize from "../hooks/use-windowSize";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpa,
  faCommentDots,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./NavBar.module.scss";

const NavBar = () => {
  const windowSize = useWindowSize();

  const menuClickHandler = (isMenuOpen) => {
    console.log(isMenuOpen);
  };

  const highlightButton = (linkState) =>
    linkState.isActive ? classes.active : "";

  let leftSideAppName;
  let rightSideNavBarContent;

  if (windowSize.width < 700) {
    leftSideAppName = (<span></span>);
    rightSideNavBarContent = (
      <MenuIcon menuIconStateHandler={menuClickHandler} />
    );
  } else {
    leftSideAppName = (<span>Message App</span>);

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

      <div className={classes["mobile-menu"]}>
        <ul>
          <li>
            <NavLink
              className={highlightButton}
              to="/"
              style={{ lineHeight: "1" }}
            >
              <FontAwesomeIcon icon={faCommentDots} />
              <span>Feed</span>
            </NavLink>
          </li>
          <li>
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
    </section>
  );
};

export default NavBar;
