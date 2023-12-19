import { NavLink } from "react-router-dom";

import classes from "./NavBar.module.scss";

const NavBar = (props) => {
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
        <button>
          <NavLink
            className={(linkState) => (linkState.isActive ? "" : "")}
            to="/"
          >
            Feed
          </NavLink>
        </button>

        <button>
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
