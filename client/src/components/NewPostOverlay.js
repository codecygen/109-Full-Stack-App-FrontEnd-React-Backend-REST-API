import classes from "./NewPostOverlay.module.scss";

const NewPostOverlay = () => {
  return (
    <section className={classes.form}>
      <header>
        <h1>Create a Post</h1>
      </header>

      <form>
        <div className={classes.input}>
          <label htmlFor="title">Title</label>
          <input id="title" placeholder="Title..." type="text" />
        </div>
        <div className={classes.input}>
          <label htmlFor="image">Image</label>
          <input id="image" type="file" />
        </div>
        <div className={classes["image-preview"]}>
          <p>Please choose an image!</p>
        </div>
        <div className={classes.input}>
          <label htmlFor="message">Message</label>
          <textarea id="message" placeholder="Message..." type="text" />
        </div>
      </form>

      <div>
        <button className={classes.button3}>Cancel</button>
        <button className={classes.button2}>Send</button>
      </div>
    </section>
  );
};

export default NewPostOverlay;
