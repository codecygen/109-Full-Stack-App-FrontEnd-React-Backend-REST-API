import { useSelector } from "react-redux";

import classes from "./DeletePostOverlay.module.scss";

const NewPostOverlay = (props) => {
  const deletePostData = useSelector(
    (state) => state.deletePost.dataDeletePost
  );

  const deleteButtonHandler = () => {
    console.log(deletePostData);
    console.log(`${deletePostData._id} is deleted!`);
  };

  return (
    <section className={classes.box}>
      <header>
        <h1>Are you sure to delete?</h1>
      </header>
      <p>{deletePostData.title}</p>
      <div>
        <button className={classes.button2} onClick={props.cancelFunc}>
          Cancel
        </button>
        <button className={classes.button3} onClick={deleteButtonHandler}>
          Delete
        </button>
      </div>
    </section>
  );
};

export default NewPostOverlay;
