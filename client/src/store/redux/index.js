import { configureStore } from "@reduxjs/toolkit";

import allPostsSlice from "./all-posts.slice";
import newPostSlice from "./new-post-slice";
import editPostSlice from "./edit-post-slice";
import deletePostSlice from "./delete-post-slice";
import detailedPostSlice from "./detailed-post-slice";

const store = configureStore({
  reducer: {
    allPosts: allPostsSlice.reducer,
    newPost: newPostSlice.reducer,
    editPost: editPostSlice.reducer,
    deletePost: deletePostSlice.reducer,
    detailedPost: detailedPostSlice.reducer,
  },
});

export default store;
