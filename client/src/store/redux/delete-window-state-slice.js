import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDeletePostWindowOpen: false,
  postData: {},
};

const deleteWindowStateSlice = createSlice({
  name: "deleteWindowState",
  initialState,
  reducers: {
    toggleWindowHandler(state, action) {
      state.isDeletePostWindowOpen = !state.isDeletePostWindowOpen;
    },

    setData(state, action) {
        const postData = action.payload;
        state.postData = postData;
    },
  },
});

export const deleteWindowStateActions = deleteWindowStateSlice.actions;
export default deleteWindowStateSlice;
