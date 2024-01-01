import classes from "./DeletePostOverlay.module.scss";

const NewPostOverlay = (props) => {
  return (
    <section className={classes.box}>
      <header>
        <h1>Are you sure to delete?</h1>
      </header>
      <p>Lmao</p>
      <div>
        <button className={classes.button2} onClick={props.cancelFunc}>Cancel</button>
        <button className={classes.button3}>Delete</button>
      </div>
    </section>
  );
};

export default NewPostOverlay;
