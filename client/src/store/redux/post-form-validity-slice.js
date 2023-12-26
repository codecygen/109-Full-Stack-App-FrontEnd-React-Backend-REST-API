import { createSlice } from "@reduxjs/toolkit";

const postFormValiditySlice = createSlice({
  name: "postFormValidity",
  initialState: {
    isTitleValid: null,
    isImageValid: null,
    isMessageValid: null,
    isFormValid: null,
  },
  reducers: {
    imageValidityChecker(state, action) {
      const validityState = action.payload;
      state.isImageValid = validityState;
    },

    // testHandler(state, action) {
    //   state.isFormValid = true;
    // },

    // testHandler(state, action) {
    //   state.isFormValid = true;
    // },

    // testHandler(state, action) {
    //   state.isFormValid = true;
    // },
  },
});

export const postFormValidityActions = postFormValiditySlice.actions;
export default postFormValiditySlice;
