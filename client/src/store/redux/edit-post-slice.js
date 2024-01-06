import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isWindowOpenEditPost: false,
  dataEditForm: null,
  errorEditForm: null,
  isLoadingEditForm: null,
};

const editPostSlice = createSlice({
  name: "editPost",
  initialState,
  reducers: {

    toggleWindow(state, action) {
      state.isWindowOpenEditPost = !state.isWindowOpenEditPost;
    },

    reset(state, action) {
      return initialState;
    },

    success(state, action) {
      state.dataEditForm = action.payload;
    },

    fail(state, action) {
      state.errorEditForm = action.payload;
    },

    loading(state, action) {
      state.isLoadingEditForm = action.payload;
    },
  },
});

export const editPostActions = editPostSlice.actions;
export default editPostSlice;
