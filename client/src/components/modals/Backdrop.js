import classes from "./Backdrop.module.scss";

const Backdrop = (props) => {

  return (
    <section
      className={classes.backdrop}
      onClick={props.cancelFunc}
    ></section>
  );
};

export default Backdrop;
