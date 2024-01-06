import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { postFormValidityActions } from "../../store/redux/new-post-slice";
import { deletePostActions } from "../../store/redux/delete-post-slice";
import { editPostActions } from "../../store/redux/edit-post-slice";
import {
  getPostsPagePosts,
  getEditWindowPost,
} from "../../store/redux/utils/apiStateManagementsThunk";

import PostModal from "../../components/modals/post-modal/PostModal";
import DeletePostModal from "../../components/modals/delete-post-modal/DeletePostModal";

import classes from "./EventsPage.module.scss";

const FeedPage = () => {
  const dispatch = useDispatch();

  const { dataAllPosts, errorAllPosts, isLoadingAllPosts } = useSelector(
    (state) => state.allPosts
  );

  useEffect(() => {
    dispatch(getPostsPagePosts());
  }, [dispatch]);

  const isPostWindowOpen = useSelector(
    (state) => state.postFormValidity.isPostFormOpen
  );

  const isWindowOpenDeletePost = useSelector(
    (state) => state.deletePost.isWindowOpenDeletePost
  );

  const isEditFormOpen = useSelector(
    (state) => state.editPost.isWindowOpenEditForm
  );

  const closePostWindow = () => {
    dispatch(postFormValidityActions.closeWindow());
    dispatch(postFormValidityActions.resetForm());

    dispatch(editPostActions.closeWindow());
    dispatch(editPostActions.resetStates());

    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
  };

  const openPostWindow = () => {
    dispatch(postFormValidityActions.openWindow());
    dispatch(editPostActions.openWindow());

    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
  };

  const closeDeletePostWindow = () => {
    dispatch(deletePostActions.toggleWindow());
  };

  const openDeletePostWindow = (DB) => {
    dispatch(deletePostActions.toggleWindow());
    dispatch(deletePostActions.setData(DB));
  };

  const editButtonHandler = (postId) => {
    dispatch(getEditWindowPost(postId));
  };

  let postContent;

  if (dataAllPosts) {
    postContent = dataAllPosts.map((post) => {
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
        {isLoadingAllPosts && <div>Loading</div>}
        {errorAllPosts && <div>{errorAllPosts}</div>}
        {!isLoadingAllPosts && !errorAllPosts && postContent}
      </section>

      {/* Message Posting Window */}
      {(isPostWindowOpen || isEditFormOpen) && (
        <PostModal cancelWindow={closePostWindow} />
      )}

      {isWindowOpenDeletePost && (
        <DeletePostModal cancelWindow={closeDeletePostWindow} />
      )}
    </main>
  );
};

export default FeedPage;
