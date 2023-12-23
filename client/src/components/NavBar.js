import { NavLink } from "react-router-dom";

import MenuIcon from "./MenuIcon";

import useWindowSize from "../hooks/use-windowSize";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpa } from "@fortawesome/free-solid-svg-icons";

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
    leftSideAppName = "";
    rightSideNavBarContent = (
      <MenuIcon menuIconStateHandler={menuClickHandler} />
    );
  } else {
    leftSideAppName = "Message App";

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
      <main className={`${classes.navbar}`}>
        <ul>
          <li>
            <NavLink to="/">
              <FontAwesomeIcon
                icon={faSpa}
                size="xl"
                style={{ verticalAlign: "middle", marginRight: "10px" }}
              />
              {leftSideAppName}
            </NavLink>
          </li>
        </ul>

        <ul className={classes["right-group"]}>{rightSideNavBarContent}</ul>
      </main>
      <div className={classes["mobile-menu"]}>Aras</div>
    </section>
  );
};

export default NavBar;
