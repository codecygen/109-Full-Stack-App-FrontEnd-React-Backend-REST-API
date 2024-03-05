import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteComment } from "../../../store/redux/utils/apiStateManagementsThunk";

import { deleteCommentActions } from "../../../store/redux/delete-comment-slice";

import classes from "./DeleteCommentOverlay.module.scss";

const DeleteCommentOverlay = (props) => {
  // const navigate = useNavigate();
  // const location = useLocation();
  const dispatch = useDispatch();

  const {
    commentDetails,
    errorDeleteComment,
    isLoadingDeleteComment,
  } = useSelector((state) => state.deleteComment);

  useEffect(() => {
    // Only close window if the data deletion request
    // successfully sent to backend
    if (errorDeleteComment === false && isLoadingDeleteComment === false) {
      dispatch(deleteCommentActions.toggleWindow());
      dispatch(deleteCommentActions.reset());
    }
  }, [dispatch, errorDeleteComment, isLoadingDeleteComment]);

  const deleteButtonHandler = () => {
    dispatch(deleteComment(commentDetails.postId, commentDetails.commentId));
  };

  let warningClasses;

  if (errorDeleteComment) {
    warningClasses = classes.error;
  } else {
    warningClasses = classes.loading;
  }

  return (
    <section className={classes.box}>
      <header>
        <h1 className={classes["delete-result"]}>
          Are you sure to delete?
        </h1>
        <p className={warningClasses}>
          {errorDeleteComment &&
            `Contact Admin: Deletion Error: ${errorDeleteComment}`}
          {isLoadingDeleteComment && "Waiting to Delete Comment!"}
        </p>
      </header>
      <p>{commentDetails.comment}</p>
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

export default DeleteCommentOverlay;
