import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataAllPosts: null,
  errorAllPosts: null,
  isLoadingAllPosts: null,
};

const allPostsSlice = createSlice({
  name: "allPosts",
  initialState,
  reducers: {
    success(state, action) {
      state.dataAllPosts = action.payload;
    },

    fail(state, action) {
      state.errorAllPosts = action.payload;
    },

    loading(state, action) {
      state.isLoadingAllPosts = action.payload;
    },
  },
});

export const allPostsActions = allPostsSlice.actions;
export default allPostsSlice;
