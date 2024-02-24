import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataAllPosts: null,
  currentPageAllPosts: null,
  totalPagesAllPosts: null,
  totalPostsAllPosts: null,
  errorAllPosts: null,
  isLoadingAllPosts: null,
};

const allPostsSlice = createSlice({
  name: "allPosts",
  initialState,
  reducers: {
    success(state, action) {
      const data = action.payload;

      state.dataAllPosts = data.posts;
      state.currentPageAllPosts = data.currentPage;
      state.totalPagesAllPosts = data.totalPages;
      state.totalPostsAllPosts = data.totalPosts
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
