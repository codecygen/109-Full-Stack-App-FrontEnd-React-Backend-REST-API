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

    const timeout = setTimeout(() => {
      if (errorDeletePost === false && isLoadingDeletePost === false) {
        dispatch(deletePostActions.toggleWindow());
        dispatch(deletePostActions.reset());
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch, errorDeletePost, isLoadingDeletePost]);

  const deleteButtonHandler = () => {
    dispatch(deletePost(dataDeletePost._id));
  };

  let warningClasses;

  if (errorDeletePost) {
    warningClasses = classes.error;
  } else {
    warningClasses = classes.loading;
  }

  return (
    <section className={classes.box}>
      <header>
        <h1 className={responseDeletePost && classes["delete-result"]}>
          {responseDeletePost
            ? "Successfully Deleted"
            : "Are you sure to delete?"}
        </h1>
        <p className={warningClasses}>
          {errorDeletePost &&
            `Contact Admin: Deletion Error: ${errorDeletePost}`}
          {isLoadingDeletePost && "Waiting to Delete Post!"}
        </p>
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
