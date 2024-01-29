import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AnimatePresence, motion } from "framer-motion";

import { getEditWindowPost } from "../store/redux/utils/apiStateManagementsThunk";
import { deletePostActions } from "../store/redux/delete-post-slice";

import Post from "./Post";

import convertDate from "../utils/convertDate";

const AllPosts = (props) => {
  // This is used to assess if the remove box and refresh animations to be played
  // or if add new item animation to be played.
  const [animationState, setAnimationState] = useState("onLoad");

  // This postList is created to update the list live on delete or create new post actions
  // without the need of refreshing the page.
  const [postList, setPostList] = useState(null);
  const dispatch = useDispatch();
  const { dataAllPosts } = useSelector((state) => state.allPosts);

  const { dataNewPost } = useSelector((state) => state.newPost);

  const { dataEditResult } = useSelector((state) => state.editPost);

  const { dataDeletePost, responseDeletePost } = useSelector(
    (state) => state.deletePost
  );

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

      setAnimationState("onDelete");
    }
  }, [dataDeletePost._id, responseDeletePost]);

  useEffect(() => {
    if (props.isPageChanged) {
      setAnimationState("onPageChange");
    }
  }, [props.isPageChanged]);

  // When a new post is added, update the state of postList
  // so that the list can be updated live instead of refreshing the page.
  useEffect(() => {
    if (dataNewPost) {
      setPostList((prevPostList) => [dataNewPost.post, ...prevPostList]);

      setAnimationState("onAdd");
    }
  }, [dataNewPost]);

  // When a post is updated, update the state of postList
  // so that the list can be updated live instead of refreshing the page.
  useEffect(() => {
    let updatedPostList;

    if (postList && dataEditResult) {
      updatedPostList = postList.map((post) => {
        if (post._id === dataEditResult._id) {
          return dataEditResult;
        }

        return post;
      });

      setPostList(updatedPostList);
    }
  }, [dataEditResult, postList]);

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
      const formattedDate = convertDate(post.createdAt);

      const linkTitleConverted = post.title.toLowerCase().split(" ").join("-");

      let initialAnimationState;

      if (animationState === "onLoad") {
        initialAnimationState = { opacity: 1, x: 0 };
      } else if (animationState === "onAdd") {
        initialAnimationState = { opacity: 0, x: "-100%" };
      } else if (animationState === "onPageChange") {
        initialAnimationState = { opacity: 1, x: 0 };
      } else if (animationState === "onDelete") {
        initialAnimationState = { opacity: 1, x: 0 };
      }

      let finalAnimationState;

      if (animationState === "onLoad") {
        finalAnimationState = { y: 10 };
      } else if (animationState === "onAdd") {
        finalAnimationState = { opacity: 1, x: 0, y: 10 };
      } else if (animationState === "onPageChange") {
        finalAnimationState = { y: 10 };
      } else if (animationState === "onDelete") {
        finalAnimationState = { y: 10 };
      }

      return (
        <motion.div
          key={post._id}
          layout
          layoutTransition={{ duration: 1 }}
          initial={initialAnimationState}
          animate={finalAnimationState}
          // exit={animationState === "onDelete" && { opacity: 0, x: "-100%" }}
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
