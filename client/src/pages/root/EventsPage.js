import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { postFormValidityActions } from "../../store/redux/post-form-validity-slice";
import { deleteWindowStateActions } from "../../store/redux/delete-window-state-slice";
import { editFormSliceActions } from "../../store/redux/edit-form-state-slice";
import { getPostsPagePosts, getEditWindowPost } from "../../store/redux/utils/apiStateManagementsThunk";

import PostModal from "../../components/modals/post-modal/PostModal";
import DeletePostModal from "../../components/modals/delete-post-modal/DeletePostModal";

import classes from "./EventsPage.module.scss";

const FeedPage = () => {
  const dispatch = useDispatch();

  const { dataState } = useSelector((state) => state.connectApi);

  useEffect(() => {
    dispatch(getPostsPagePosts());
  }, [dispatch]);

  const isPostWindowOpen = useSelector(
    (state) => state.postFormValidity.isPostFormOpen
  );

  const isDeletePostWindowOpen = useSelector(
    (state) => state.deleteWindowState.isDeletePostWindowOpen
  );

  const isEditFormOpen = useSelector(
    (state) => state.editFormSlice.isEditFormOpen
  );

  const closePostWindow = () => {
    dispatch(postFormValidityActions.postFormCloseHandler());
    dispatch(postFormValidityActions.resetFormValidity());

    dispatch(editFormSliceActions.editFormCloseHandler());
    dispatch(editFormSliceActions.resetStates());

    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
  };

  const openPostWindow = () => {
    dispatch(postFormValidityActions.postFormOpenHandler());
    dispatch(editFormSliceActions.editFormOpenHandler());

    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
  };

  const closeDeletePostWindow = () => {
    dispatch(deleteWindowStateActions.toggleWindowHandler());
  };

  const openDeletePostWindow = (DB) => {
    dispatch(deleteWindowStateActions.toggleWindowHandler());
    dispatch(deleteWindowStateActions.setData(DB));
  };

  const editButtonHandler = (postId) => {;
    dispatch(getEditWindowPost(postId));
  };

  let postContent;

  if (dataState.data) {
    postContent = dataState.data.map((post) => {
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      };
      const formattedDate = new Date(post.createdAt).toLocaleDateString(
        "en-US",
        options
      );

      const linkTitleConverted = post.title.toLowerCase().split(" ").join("-");

      return (
        <div className={classes.post} key={post._id}>
          <p>
            Posted by {post.creator.name} on {formattedDate}
          </p>
          <h1>{post.title}</h1>
          <div className={classes.buttons}>
            <button className={classes.button1}>
              <NavLink to={`/details/${linkTitleConverted}/${post._id}`}>
                View
              </NavLink>
            </button>
            <button
              className={classes.button1}
              onClick={editButtonHandler.bind(null, post._id)}
            >
              Edit
            </button>
            <button
              className={classes.button4}
              onClick={openDeletePostWindow.bind(null, post)}
            >
              Delete
            </button>
          </div>
        </div>
      );
    });
  }

  return (
    <main className={classes.main}>
      <button className={classes.button5} onClick={openPostWindow}>
        New Event
      </button>
      <section className={classes.posts}>

        {dataState.isLoading && <div>Loading</div>}
        {dataState.error && <div>{dataState.error}</div>}
        {!dataState.isLoading && !dataState.error && postContent}
      </section>

      {/* Message Posting Window */}
      {(isPostWindowOpen || isEditFormOpen) && (
        <PostModal cancelWindow={closePostWindow} />
      )}

      {isDeletePostWindowOpen && (
        <DeletePostModal cancelWindow={closeDeletePostWindow} />
      )}
    </main>
  );
};

export default FeedPage;
