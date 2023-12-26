import { createSlice } from "@reduxjs/toolkit";

const formValiditySlice = createSlice({
  name: "formValidity",
  initialState: {
    isFormValid: false,
  },
  reducers: {
    testHandler(state, action) {
      state.isFormValid = true;
    },
  },
});

export const formValidityActions = formValiditySlice.actions;
export default formValiditySlice;
