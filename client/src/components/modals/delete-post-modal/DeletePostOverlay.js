import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deletePost } from "../../../store/redux/utils/apiStateManagementsThunk";

import { deletePostActions } from "../../../store/redux/delete-post-slice";

import classes from "./DeletePostOverlay.module.scss";

const NewPostOverlay = (props) => {
  const dispatch = useDispatch();

  const {
    dataDeletePost,
    responseDeletePost,
    errorDeletePost,
    isLoadingDeletePost,
  } = useSelector((state) => state.deletePost);

  useEffect(() => {
    // Only close errorpost window if the data deletion request
    // successfully sent to backend
    if (errorDeletePost === false && isLoadingDeletePost === false) {
      dispatch(deletePostActions.toggleWindow());
    }
  }, [dispatch, errorDeletePost, isLoadingDeletePost]);

  const deleteButtonHandler = () => {
    dispatch(deletePost(dataDeletePost._id));
  };

  return (
    <section className={classes.box}>
      <header>
        <h1>Are you sure to delete?</h1>
        <p>Problem</p>
      </header>
      <p>{dataDeletePost.title}</p>
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
