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
        console.log(action.payload);
        state.data = action.payload;
    },

    fetchDataFail(state, action) {
        console.log(action.payload);
        state.error = action.payload;
    },

    fetchDataLoading(state, action) {
        console.log(action.payload);
        state.isLoading = action.payload;
    },
  },
});

export const connectApiSliceActions = connectApiSlice.actions;
export default connectApiSlice;
