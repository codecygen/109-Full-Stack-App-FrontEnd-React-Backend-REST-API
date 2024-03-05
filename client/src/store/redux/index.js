import { configureStore } from "@reduxjs/toolkit";

import allPostsSlice from "./all-posts-slice";
import newPostSlice from "./new-post-slice";
import editPostSlice from "./edit-post-slice";
import deletePostSlice from "./delete-post-slice";
import detailedPostSlice from "./detailed-post-slice";

import signupSlice from "./signup-slice";
import loginSlice from "./login-slice";

import allCommentsSlice from "./all-comments-slice";
import postCommentSlice from "./post-comments-slice";
import deleteCommentSlice from "./delete-comment-slice";
import editCommentSlice from "./edit-comment-slice";

const store = configureStore({
  reducer: {
    allPosts: allPostsSlice.reducer,
    newPost: newPostSlice.reducer,
    editPost: editPostSlice.reducer,
    deletePost: deletePostSlice.reducer,
    detailedPost: detailedPostSlice.reducer,

    signup: signupSlice.reducer,
    login: loginSlice.reducer,

    allComments: allCommentsSlice.reducer,
    postComment: postCommentSlice.reducer,
    deleteComment: deleteCommentSlice.reducer,
    editComment: editCommentSlice.reducer,
  },
});

export default store;
