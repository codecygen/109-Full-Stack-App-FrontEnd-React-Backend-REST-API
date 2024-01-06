import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isWindowOpenDeletePost: false,
  dataDeletePost: {},
};

const deleteWindowStateSlice = createSlice({
  name: "deleteWindowState",
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

export const deleteWindowStateActions = deleteWindowStateSlice.actions;
export default deleteWindowStateSlice;
