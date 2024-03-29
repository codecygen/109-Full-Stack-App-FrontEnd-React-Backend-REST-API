import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isWindowOpenEditPost: false,
  dataEditForm: null,
  errorEditForm: null,
  isLoadingEditForm: null,

  dataEditResult: null,
  errorEditResult: null,
  isLoadingEditResult: null,
};

const editPostSlice = createSlice({
  name: "editPost",
  initialState,
  reducers: {

    toggleWindow(state, action) {
      state.isWindowOpenEditPost = !state.isWindowOpenEditPost;

      if (state.isWindowOpenEditPost === true) {
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";
      } else {
        document.body.style.overflow = "scroll";
        document.body.style.height = "auto";
      }
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

    successSendingUpdatePost(state, action) {
      state.dataEditResult = action.payload;
    },

    failSendingUpdatePost(state, action) {
      state.errorEditResult = action.payload;
    },

    loadingSendingUpdatePost(state, action) {
      state.isLoadingEditResult = action.payload;
    },
  },
});

export const editPostActions = editPostSlice.actions;
export default editPostSlice;
