import { newPostActions } from "../new-post-slice";
import { allPostsActions } from "../all-posts.slice";
import { editPostActions } from "../edit-post-slice";
import { deletePostActions } from "../delete-post-slice";

import getAllPosts from "./api/getAllPosts";
import getOnePost from "./api/getOnePost";
import postOnePost from "./api/postOnePost";
import updateOnePost from "./api/updateOnePost";
import deleteOnePost from "./api/deleteOnePost";

export const getPostsPagePosts = () => {
  return async (dispatch) => {
    await getAllPosts(
      dispatch,
      allPostsActions.success,
      allPostsActions.loading,
      allPostsActions.fail
    );
  };
};

export const getEditWindowPost = (id) => {
  return async (dispatch) => {
    dispatch(editPostActions.toggleWindow());
    await getOnePost(
      id,
      dispatch,
      editPostActions.success,
      editPostActions.loading,
      editPostActions.fail
    );
  };
};

export const createNewPost = (postData) => {
  return async (dispatch) => {
    await postOnePost(
      postData,
      dispatch,
      newPostActions.success,
      newPostActions.loading,
      newPostActions.fail
    );
  };
};

export const updatePost = (postId, postData) => {
  return async (dispatch) => {
    await updateOnePost(
      postId,
      postData,
      dispatch,
      editPostActions.successSendingUpdatePost,
      editPostActions.loadingSendingUpdatePost,
      editPostActions.failSendingUpdatePost
    );
  };
};

export const deletePost = (postId) => {
  return async (dispatch) => {
    await deleteOnePost(
      postId,
      dispatch,
      deletePostActions.success,
      deletePostActions.loading,
      deletePostActions.fail
    );
  };
};
