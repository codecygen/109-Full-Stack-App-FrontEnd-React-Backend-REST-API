import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  error: null,
  isLoading: null,
};

const connectApiSlice = createSlice({
  name: "connectApi",
  initialState,
  reducers: {
    fetchDataSuccess(state, action) {
        state.data = action.payload;
    },

    fetchDataFail(state, action) {
        state.error = action.payload;
    },

    fetchDataLoading(state, action) {
        state.isLoading = action.payload;
    },
  },
});

export const connectApiSliceActions = connectApiSlice.actions;
export default connectApiSlice;
