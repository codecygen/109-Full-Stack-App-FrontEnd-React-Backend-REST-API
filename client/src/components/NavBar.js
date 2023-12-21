import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpa } from "@fortawesome/free-solid-svg-icons";

import classes from "./NavBar.module.scss";

const NavBar = (props) => {
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
