import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AnimatePresence, motion } from "framer-motion";

import { getEditWindowPost } from "../store/redux/utils/apiStateManagementsThunk";
import { deletePostActions } from "../store/redux/delete-post-slice";

import Post from "./Post";

const AllPosts = () => {
  // This is used to assess if the remove box and refresh animations to be played
  // or if add new item animation to be played.
  const [isOnMount, setIsOnMount] = useState(true);

  // This postList is created to update the list live on delete or create new post actions
  // without the need of refreshing the page.
  const [postList, setPostList] = useState(null);
  const dispatch = useDispatch();
  const { dataAllPosts } = useSelector((state) => state.allPosts);

  const { dataNewPost } = useSelector((state) => state.newPost);

  const {
    dataDeletePost,
    responseDeletePost,
    // errorDeletePost,
    // isLoadingDeletePost,
  } = useSelector((state) => state.deletePost);

  // Only update postList from the database data on page reload
  const setPostMemoized = useCallback(() => {
    setPostList(dataAllPosts);
  }, [dataAllPosts]);

  // Only update postList from the database data on page reload
  useEffect(() => {
    setPostMemoized();
  }, [setPostMemoized]);

  // postList then can be updated if a post is deleted from the list
  // This postList is created to update the list live on delete or create new post actions
  // without the need of refreshing the page.
  useEffect(() => {
    if (responseDeletePost) {
      setPostList((prevValues) =>
        prevValues.filter((value) => value._id !== dataDeletePost._id)
      );

      setIsOnMount(true);
    }
  }, [dataDeletePost._id, responseDeletePost]);

  // When a new post is added, update the state of postList
  useEffect(() => {
    if (dataNewPost) {
      setPostList((prevPostList) => [dataNewPost.post, ...prevPostList]);

      setIsOnMount(false);
    }
  }, [dataNewPost]);

  const openDeletePostWindow = (DB) => {
    dispatch(deletePostActions.toggleWindow());
    dispatch(deletePostActions.setData(DB));
  };

  const editButtonHandler = (postId) => {
    dispatch(getEditWindowPost(postId));
  };

  let postContent;

  if (postList) {
    postContent = postList.map((post, index) => {
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
        <motion.div
          key={post._id}
          layout
          layoutTransition={{ duration: 1 }}
          initial={
            isOnMount ? { opacity: 1, x: 0 } : { opacity: 0, x: "-100%" }
          }
          animate={isOnMount ? { y: 10 } : { opacity: 1, x: 0, y: 10 }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ duration: 0.3 }}
        >
          <Post
            post={post}
            formattedDate={formattedDate}
            linkTitleConverted={linkTitleConverted}
            editButtonClick={editButtonHandler}
            deleteButtonClick={openDeletePostWindow}
          />
        </motion.div>
      );
    });
  }

  return (
    <>
      <AnimatePresence>{postContent}</AnimatePresence>
    </>
  );
};

export default AllPosts;
