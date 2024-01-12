import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isWindowOpenDeletePost: false,
  dataDeletePost: {},
  responseDeletePost: null,
  errorDeletePost: null,
  isLoadingDeletePost: null,
};

const deletePostSlice = createSlice({
  name: "deletePost",
  initialState,
  reducers: {
    toggleWindow(state, action) {
      state.isWindowOpenDeletePost = !state.isWindowOpenDeletePost;

      if (state.isWindowOpenDeletePost === true) {
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";
      } else {
        document.body.style.overflow = "scroll";
        document.body.style.height = "auto";
      }
    },

    setData(state, action) {
        const postData = action.payload;
        state.dataDeletePost = postData;
    },

    reset(state, action) {
      return initialState;
    },

    success(state, action) {
      state.responseDeletePost = action.payload;
    },

    fail(state, action) {
      state.errorDeletePost = action.payload;
    },

    loading(state, action) {
      state.isLoadingDeletePost = action.payload;
    },
  },
});

export const deletePostActions = deletePostSlice.actions;
export default deletePostSlice;
