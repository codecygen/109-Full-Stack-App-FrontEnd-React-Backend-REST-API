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
    },

    setData(state, action) {
        const postData = action.payload;
        state.dataDeletePost = postData;
    },
  },
});

export const deletePostActions = deletePostSlice.actions;
export default deletePostSlice;
