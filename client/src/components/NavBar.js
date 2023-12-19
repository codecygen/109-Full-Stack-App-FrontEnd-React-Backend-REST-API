import { NavLink } from "react-router-dom";

import classes from "./NavBar.module.scss";

const NavBar = (props) => {
  const feedButtonClasses =
    props.currentPage === "Feed"
      ? `${classes["higlighted-button"]} ${classes.button}`
      : classes.button;

  const logoutButtonClasses =
    props.currentPage === "Logout"
      ? `${classes["higlighted-button"]} ${classes.button}`
      : classes.button;

  return (
    <main className={`commonPadding ${classes.navbar}`}>
      <button>
        <NavLink
          className={(linkState) => (linkState.isActive ? "" : "")}
          to="/"
        >
          Welcome
        </NavLink>
      </button>

      <section className={classes["right-group"]}>
        <button
          onClick={props.setPageHandler.bind(null, "Feed")}
          className={feedButtonClasses}
        >
          <NavLink
            className={(linkState) => (linkState.isActive ? "" : "")}
            to="/"
          >
            Feed
          </NavLink>
        </button>

        <button
          onClick={props.setPageHandler.bind(null, "Logout")}
          className={logoutButtonClasses}
        >
          <NavLink
            className={(linkState) => (linkState.isActive ? "" : "")}
            to="/login"
          >
            Logout
          </NavLink>
        </button>
      </section>
    </main>
  );
};

export default NavBar;
