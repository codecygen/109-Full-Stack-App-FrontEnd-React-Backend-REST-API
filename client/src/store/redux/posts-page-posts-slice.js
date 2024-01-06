import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postsData: null,
  postsError: null,
  postsIsLoading: null,
};

const postsPagePostsSlice = createSlice({
  name: "postsPagePosts",
  initialState,
  reducers: {
    success(state, action) {
      state.postsData = action.payload;
    },

    fail(state, action) {
      state.postsError = action.payload;
    },

    loading(state, action) {
      state.postsIsLoading = action.payload;
    },
  },
});

export const postsPagePostsActions = postsPagePostsSlice.actions;
export default postsPagePostsSlice;
