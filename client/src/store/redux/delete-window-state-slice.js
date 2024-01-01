import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDeletePostWindowOpen: false,

  deletePostData: {},
};

const deleteWindowStateSlice = createSlice({
  name: "deleteWindowState",
  initialState,
  reducers: {
    toggleWindowHandler(state, action) {
      state.isDeletePostWindowOpen = !state.isDeletePostWindowOpen;
    },
  },
});

export const deleteWindowStateActions = deleteWindowStateSlice.actions;
export default deleteWindowStateSlice;
