import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isWindowOpenDeleteComment: false,
  dataDeleteComment: null,
  errorDeleteComment: null,
  isLoadingDeleteComment: null,
};

const deleteCommentSlice = createSlice({
  name: "deleteComment",
  initialState,
  reducers: {
    toggleWindow(state, action) {
      state.isWindowOpenDeleteComment = !state.isWindowOpenDeleteComment;
    },

    reset(state, action) {
      return initialState;
    },

    success(state, action) {
      const data = action.payload;
      state.dataDeleteComment = data.comment;
    },

    fail(state, action) {
      state.errorDeleteComment = action.payload;
    },

    loading(state, action) {
      state.isLoadingDeleteComment = action.payload;
    },
  },
});

export const deleteCommentActions = deleteCommentSlice.actions;
export default deleteCommentSlice;
