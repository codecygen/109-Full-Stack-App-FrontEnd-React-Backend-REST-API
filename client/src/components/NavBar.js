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
        <NavLink to="/">Welcome</NavLink>
      </button>

      <section className={classes["right-group"]}>
        <button
          onClick={props.setPageHandler.bind(null, "Feed")}
          className={feedButtonClasses}
        >
          <NavLink to="/">Feed</NavLink>
        </button>

        <button
          onClick={props.setPageHandler.bind(null, "Logout")}
          className={logoutButtonClasses}
        >
          <NavLink to="/login">Logout</NavLink>
        </button>
      </section>
    </main>
  );
};

export default NavBar;
