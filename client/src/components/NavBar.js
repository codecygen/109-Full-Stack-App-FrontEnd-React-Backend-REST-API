import { NavLink } from "react-router-dom";

import classes from "./NavBar.module.scss";

const NavBar = (props) => {
  const highlightButton = (linkState) =>
    linkState.isActive ? classes.active : "";

  return (
    <main className={`${classes.navbar}`}>
      <ul>
        <li>
          <NavLink to="/">
            Message App
          </NavLink>
        </li>
      </ul>

      <ul className={classes["right-group"]}>
        <li>
          <NavLink className={highlightButton} to="/">
            Feed
          </NavLink>
        </li>

        <li>
          <NavLink
            className={highlightButton}
            to="/login"
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </main>
  );
};

export default NavBar;
