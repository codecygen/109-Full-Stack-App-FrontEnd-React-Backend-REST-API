import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataAllComments: null,
  errorAllComments: null,
  isLoadingAllComments: null,
};

const allCommentsSlice = createSlice({
  name: "allComments",
  initialState,
  reducers: {
    success(state, action) {
      const data = action.payload;
      state.dataAllComments = data.comment;
    },

    fail(state, action) {
      state.errorAllComments = action.payload;
    },

    loading(state, action) {
      state.isLoadingAllComments = action.payload;
    },
  },
});

export const allCommentsActions = allCommentsSlice.actions;
export default allCommentsSlice;
