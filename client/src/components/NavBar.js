import { NavLink } from "react-router-dom";

import useWindowSize from "../hooks/use-windowSize";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpa, faBarsStaggered } from "@fortawesome/free-solid-svg-icons";

import classes from "./NavBar.module.scss";

const NavBar = (props) => {
  const windowSize = useWindowSize();

  if (windowSize.width < 700) {
    console.log("Screen is less than 700px!");
    console.log(windowSize.width);
  }

  const highlightButton = (linkState) =>
    linkState.isActive ? classes.active : "";

  return (
    <main className={`${classes.navbar}`}>
      <ul>
        <li>
          <NavLink to="/">
            <FontAwesomeIcon
              icon={faSpa}
              size="xl"
              style={{ verticalAlign: "middle", marginRight: "10px" }}
            />
            <FontAwesomeIcon icon={faBarsStaggered} fade />
            Message App
          </NavLink>
        </li>
      </ul>

      <ul className={classes["right-group"]}>
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
      </ul>
    </main>
  );
};

export default NavBar;
