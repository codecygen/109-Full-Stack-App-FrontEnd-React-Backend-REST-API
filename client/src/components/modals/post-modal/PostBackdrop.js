import classes from "./PostBackdrop.module.scss";

const PostBackdrop = (props) => {

  return (
    <section
      className={classes.backdrop}
      onClick={props.cancelFunc}
    ></section>
  );
};

export default PostBackdrop;
