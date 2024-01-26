import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { newPostActions } from "../../store/redux/new-post-slice";
import { deletePostActions } from "../../store/redux/delete-post-slice";
import { editPostActions } from "../../store/redux/edit-post-slice";
import { getPostsPagePosts } from "../../store/redux/utils/apiStateManagementsThunk";

import PostModal from "../../components/modals/post-modal/PostModal";
import DeletePostModal from "../../components/modals/delete-post-modal/DeletePostModal";

import AllPosts from "../../components/AllPosts";
import Loader from "../../components/Loader";

import classes from "./EventsPage.module.scss";

const FeedPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  console.log(searchParams);

  const { errorAllPosts, isLoadingAllPosts } = useSelector(
    (state) => state.allPosts
  );

  useEffect(() => {
    dispatch(getPostsPagePosts());
  }, [dispatch]);

  const isPostWindowOpen = useSelector(
    (state) => state.newPost.isWindowOpenNewPost
  );

  const isWindowOpenDeletePost = useSelector(
    (state) => state.deletePost.isWindowOpenDeletePost
  );

  const isEditFormOpen = useSelector(
    (state) => state.editPost.isWindowOpenEditPost
  );

  const closePostWindow = () => {
    dispatch(newPostActions.toggleWindow());
    dispatch(newPostActions.reset());

    dispatch(editPostActions.toggleWindow());
    dispatch(editPostActions.reset());
  };

  const openPostWindow = () => {
    dispatch(newPostActions.toggleWindow());
    dispatch(editPostActions.toggleWindow());
  };

  const closeDeletePostWindow = () => {
    dispatch(deletePostActions.toggleWindow());
  };

  return (
    <main className={classes.main}>
      <button className={classes.button5} onClick={openPostWindow}>
        New Event
      </button>

      <section className={classes.posts}>
        {isLoadingAllPosts && (
          <div className={classes.center}>
            <Loader />
          </div>
        )}

        {errorAllPosts && <div className={classes.center}>{errorAllPosts}</div>}
        {!isLoadingAllPosts && !errorAllPosts && <AllPosts />}
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
