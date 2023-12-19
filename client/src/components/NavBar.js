import NavButton from "../buttons/NavButton";

import classes from "./NavBar.module.scss";

const NavBar = () => {
  return (
    <main className={`commonPadding ${classes.navbar}`}>
      <button>MessageNode</button>
      <section className={classes["right-group"]}>
        <NavButton>Feed</NavButton>
        <NavButton>Logout</NavButton>
      </section>
    </main>
  );
};

export default NavBar;
