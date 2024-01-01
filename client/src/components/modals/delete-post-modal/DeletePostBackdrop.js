import classes from "./DeletePostBackdrop.module.scss";

const NewPostBackdrop = (props) => {

  return (
    <section
      className={classes.backdrop}
      onClick={props.cancelFunc}
    ></section>
  );
};

export default NewPostBackdrop;
