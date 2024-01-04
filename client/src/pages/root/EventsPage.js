import { useEffect } from "react";

import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import useConnectApi from "../../hooks/use-connectAPI";

import { postFormValidityActions } from "../../store/redux/post-form-validity-slice";
import { deleteWindowStateActions } from "../../store/redux/delete-window-state-slice";
import { editFormSliceActions } from "../../store/redux/edit-form-state-slice";

import PostModal from "../../components/modals/post-modal/PostModal";
import DeletePostModal from "../../components/modals/delete-post-modal/DeletePostModal";

import classes from "./EventsPage.module.scss";

import DB from "../../database/posts.json";

const FeedPage = () => {
  const { data, isLoading, error, getAll, getOne } = useConnectApi();

  console.log(data);

  useEffect(() => {
    getAll();
  }, [getAll]);

  const dispatch = useDispatch();
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

  const editButtonHandler = (postId) => {
    const foundPost = DB.find((post) => post._id === postId);

    dispatch(editFormSliceActions.openAndPopulateWindow(foundPost));
  };

  const postContent = DB.map((post) => {
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

  return (
    <main className={classes.main}>
      <button className={classes.button5} onClick={openPostWindow}>
        New Event
      </button>
      <section className={classes.posts}>
        {DB && DB.length > 0 ? postContent : <div>No Post Yet</div>}
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
