import classes from "./NewPostOverlay.module.scss";

const NewPostOverlay = () => {
  return (
    <section className={classes.form}>
      <h1>Create a Post</h1>
      <div>
        <form>
          <div>
            <label htmlFor="title">Title</label>
            <input id="title" placeholder="Title..." type="text" />
          </div>
          <div>
            <label htmlFor="title">Title</label>
            <input id="title" placeholder="Title..." type="text" />
          </div>
          <div>
            <label htmlFor="title">Title</label>
            <input id="title" placeholder="Title..." type="text" />
          </div>
        </form>
      </div>
      <div>Some Text</div>
    </section>
  );
};

export default NewPostOverlay;