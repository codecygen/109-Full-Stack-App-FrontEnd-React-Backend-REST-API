import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataState: {
    data: null,
    error: null,
    isLoading: null,
  },
};

const postsPagePostsSlice = createSlice({
  name: "postsPagePosts",
  initialState,
  reducers: {
    success(state, action) {
      state.dataState.data = action.payload;
    },

    fail(state, action) {
      state.dataState.error = action.payload;
    },

    loading(state, action) {
      state.dataState.isLoading = action.payload;
    },
  },
});

export const postsPagePostsActions = postsPagePostsSlice.actions;
export default postsPagePostsSlice;
