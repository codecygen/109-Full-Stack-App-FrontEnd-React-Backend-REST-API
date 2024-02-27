import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataPostComment: null,
  errorPostComment: null,
  isLoadingPostComment: null,
};

const postCommentSlice = createSlice({
  name: "postComment",
  initialState,
  reducers: {
    success(state, action) {
      const data = action.payload;
      state.dataPostComment = data.comment;
    },

    fail(state, action) {
      state.errorPostComment = action.payload;
    },

    loading(state, action) {
      state.isLoadingPostComment = action.payload;
    },
  },
});

export const postCommentActions = postCommentSlice.actions;
export default postCommentSlice;
