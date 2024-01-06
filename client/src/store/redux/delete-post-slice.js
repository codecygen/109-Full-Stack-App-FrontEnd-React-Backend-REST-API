import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isWindowOpenDeletePost: false,
  dataDeletePost: {},
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
  },
});

export const deletePostActions = deletePostSlice.actions;
export default deletePostSlice;
