import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditingComment: false,

  dataEditForm: null,
  errorEditForm: null,
  isLoadingEditForm: null,

  dataCommentEditResult: null,
  errorCommentEditResult: null,
  isLoadingCommentEditResult: null,
};

const editCommentSlice = createSlice({
  name: "editComment",
  initialState,
  reducers: {
    toggleEditing(state, action) {
      state.isEditingComment = !state.isEditingComment;
    },

    success(state, action) {
      state.dataCommentEditResult = action.payload;
    },

    fail(state, action) {
      state.errorCommentEditResult = action.payload;
    },

    loading(state, action) {
      state.isLoadingCommentEditResult = action.payload;
    },
  },
});

export const editCommentActions = editCommentSlice.actions;
export default editCommentSlice;
