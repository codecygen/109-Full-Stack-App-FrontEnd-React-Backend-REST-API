import classes from "./NavButton.module.scss";

const NavButton = (props) => {
  return <button className={classes.button}>{props.children}</button>;
};

export default NavButton;
