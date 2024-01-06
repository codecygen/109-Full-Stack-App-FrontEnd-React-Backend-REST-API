import { configureStore } from "@reduxjs/toolkit";

import postFormValiditySlice from "./post-form-validity-slice";
import deletePostSlice from "./delete-post-slice";
import editFormStateSlice from "./edit-form-state-slice";
import allPostsSlice from "./all-posts.slice";

const store = configureStore({
  reducer: {
    postFormValidity: postFormValiditySlice.reducer,
    deletePost: deletePostSlice.reducer,
    editFormSlice: editFormStateSlice.reducer,
    allPosts: allPostsSlice.reducer,
  },
});

export default store;
