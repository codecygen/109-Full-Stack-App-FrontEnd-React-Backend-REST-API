import { createSlice } from "@reduxjs/toolkit";

const postFormValiditySlice = createSlice({
  name: "postFormValidity",
  initialState: {
    isTitleValid: false,
    isImageValid: false,
    isMessageValid: false,
    isFormValid: false,
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
