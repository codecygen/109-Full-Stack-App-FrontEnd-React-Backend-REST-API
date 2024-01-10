import { useDispatch, useSelector } from "react-redux";

import { deletePost } from "../../../store/redux/utils/apiStateManagementsThunk";

import classes from "./DeletePostOverlay.module.scss";

const NewPostOverlay = (props) => {
  const dispatch = useDispatch();

  const deletePostData = useSelector(
    (state) => state.deletePost.dataDeletePost
  );

  const deleteButtonHandler = () => {
    dispatch(deletePost(deletePostData._id));
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
