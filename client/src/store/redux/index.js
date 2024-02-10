import { configureStore } from "@reduxjs/toolkit";

import allPostsSlice from "./all-posts.slice";
import newPostSlice from "./new-post-slice";
import editPostSlice from "./edit-post-slice";
import deletePostSlice from "./delete-post-slice";
import detailedPostSlice from "./detailed-post-slice";

import signupSlice from "./signup-slice";
import loginSlice from "./login-slice";

const store = configureStore({
  reducer: {
    allPosts: allPostsSlice.reducer,
    newPost: newPostSlice.reducer,
    editPost: editPostSlice.reducer,
    deletePost: deletePostSlice.reducer,
    detailedPost: detailedPostSlice.reducer,
    
    signup: signupSlice.reducer,
    login: loginSlice.reducer,
  },
});

export default store;
