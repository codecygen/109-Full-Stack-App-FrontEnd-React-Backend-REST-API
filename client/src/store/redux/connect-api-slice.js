import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataState: {
    data: null,
    error: null,
    isLoading: null,
  },
};

const connectApiSlice = createSlice({
  name: "connectApi",
  initialState,
  reducers: {
    getAllSuccess(state, action) {
      state.dataState.data = action.payload;
    },

    getAllFail(state, action) {
      state.dataState.error = action.payload;
    },

    getAllLoading(state, action) {
      state.dataState.isLoading = action.payload;
    },
  },
});

export const connectApiSliceActions = connectApiSlice.actions;
export default connectApiSlice;
