import classes from "./FeedPage.module.scss";

const FeedPage = (props) => {
  return (
    <main className={classes.main}>
      <button className={classes.button} onClick={props.openMessageWindow}>New Post</button>
    </main>
  );
};

export default FeedPage;
