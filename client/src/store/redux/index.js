import { configureStore } from "@reduxjs/toolkit";

import postFormValiditySlice from "./post-form-validity-slice";
import deletePostSlice from "./delete-post-slice";
import editPostSlice from "./edit-post-slice";
import allPostsSlice from "./all-posts.slice";

const store = configureStore({
  reducer: {
    allPosts: allPostsSlice.reducer,
    editPost: editPostSlice.reducer,
    deletePost: deletePostSlice.reducer,
    postFormValidity: postFormValiditySlice.reducer,
  },
});

export default store;
