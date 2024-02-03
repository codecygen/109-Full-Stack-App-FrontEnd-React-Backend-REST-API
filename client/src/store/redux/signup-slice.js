import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEmailValid: false,
  isUsernameValid: false,
  isPasswordValid: false,
  isFormValid: false,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    checkEmail(state, action) {
      const email = action.payload;
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      state.isEmailValid = emailRegex.test(email);
    },

    checkName(state, action) {
      const username = action.payload;

      state.isUsernameValid = username.trim().length > 0;
    },

    checkPassword(state, action) {
      const { password, repeatPassword } = action.payload;

      if (password !== repeatPassword) {
        state.isPasswordValid = false;
        return;
      }

      state.isPasswordValid = password.trim().length > 5;
    },

    checkForm(state, action) {
      state.isFormValid =
        state.isEmailValid && state.isUsernameValid && state.isPasswordValid;
    },
  },
});

export const signupActions = signupSlice.actions;
export default signupSlice;
