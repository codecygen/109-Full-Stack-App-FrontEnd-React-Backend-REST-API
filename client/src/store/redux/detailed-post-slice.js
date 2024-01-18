import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  responseDetailedPost: null,
  errorDetailedPost: null,
  isLoadingDetailedPost: null,
};

const detailedPostSlice = createSlice({
  name: "detailedPost",
  initialState,
  reducers: {
    success(state, action) {
      state.responseDetailedPost = action.payload;
    },

    fail(state, action) {
      state.errorDetailedPost = action.payload;
    },

    loading(state, action) {
        state.isLoadingDetailedPost = action.payload;
    },
  },
});

export const detailedPostActions = detailedPostSlice.actions;
export default detailedPostSlice;
