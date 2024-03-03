import { newPostActions } from "../new-post-slice";
import { allPostsActions } from "../all-posts-slice";
import { editPostActions } from "../edit-post-slice";
import { deletePostActions } from "../delete-post-slice";
import { detailedPostActions } from "../detailed-post-slice";
import { signupActions } from "../signup-slice";
import { loginActions } from "../login-slice";
import { allCommentsActions } from "../all-comments-slice";
import { postCommentActions } from "../post-comments-slice";
import { deleteCommentActions } from "../delete-comment-slice";

import getAllPosts from "./api/getAllPosts";
import getOnePost from "./api/getOnePost";
import postOnePost from "./api/postOnePost";
import updateOnePost from "./api/updateOnePost";
import deleteOnePost from "./api/deleteOnePost";
import signupOneUser from "./api/signupOneUser";
import loginOneUser from "./api/loginOneUser";
import getPostComments from "./api/getPostComments";
import postOneComment from "./api/postOneComment";
import deleteOneComment from "./api/deleteOneComment";

export const getPostsPagePosts = (currentPage) => {
  return async (dispatch) => {
    await getAllPosts(
      currentPage,
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

export const getDetailsPagePost = (id) => {
  return async (dispatch) => {
    await getOnePost(
      id,
      dispatch,
      detailedPostActions.success,
      detailedPostActions.loading,
      detailedPostActions.fail
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

export const signup = (signupData) => {
  return async (dispatch) => {
    await signupOneUser(
      signupData,
      dispatch,
      signupActions.success,
      signupActions.loading,
      signupActions.fail
    );
  };
};

export const login = (loginData) => {
  return async (dispatch) => {
    await loginOneUser(
      loginData,
      dispatch,
      loginActions.success,
      loginActions.loading,
      loginActions.fail
    );
  };
};

// No thunk needed for this, it seems redundant
// but I made it
export const getComments = (postId) => {
  return async (dispatch) => {
    await getPostComments(
      postId,
      dispatch,
      allCommentsActions.success,
      allCommentsActions.loading,
      allCommentsActions.fail
    );
  };
};

export const postComment = (postId, commentString) => {
  return async (dispatch) => {
    await postOneComment(
      postId,
      commentString,
      dispatch,
      postCommentActions.success,
      postCommentActions.loading,
      postCommentActions.fail
    );
  };
};

export const deleteComment = (postId, commentId) => {
  return async (dispatch) => {
    await deleteOneComment(
      postId,
      commentId,
      dispatch,
      deleteCommentActions.success,
      deleteCommentActions.loading,
      deleteCommentActions.fail
    );
  };
};
