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
      <button>MessageNode</button>
      <section className={classes["right-group"]}>
        <button
          onClick={props.setPageHandler.bind(null, "Feed")}
          className={feedButtonClasses}
        >
          Feed
        </button>

        <button
          onClick={props.setPageHandler.bind(null, "Logout")}
          className={logoutButtonClasses}
        >
          Logout
        </button>
      </section>
    </main>
  );
};

export default NavBar;
