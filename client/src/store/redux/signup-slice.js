import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEmailValid: null,
  isUsernameValid: null,
  areBothPassesValid: null,
  isPasswordValid: null,
  isRepeatPasswordValid: null,
  isFormValid: null,
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

      state.isPasswordValid = password.trim().length > 5;

      state.isRepeatPasswordValid =
        repeatPassword.trim().length > 5 && password === repeatPassword;

      if (password !== repeatPassword) {
        state.areBothPassesValid = false;
        return;
      }

      state.areBothPassesValid =
        password.trim().length > 5 && repeatPassword.trim().length > 5;
    },

    checkRepeatPassword(state, action) {
      const { password, repeatPassword } = action.payload;

      state.isRepeatPasswordValid =
        repeatPassword.trim().length > 5 && password === repeatPassword;

      if (password !== repeatPassword) {
        state.areBothPassesValid = false;
        return;
      }

      state.areBothPassesValid =
        password.trim().length > 5 && repeatPassword.trim().length > 5;
    },

    checkForm(state, action) {
      state.isFormValid =
        state.isEmailValid && state.isUsernameValid && state.areBothPassesValid;
    },

    resetState(state, action) {
      return initialState;
    }
  },
});

export const signupActions = signupSlice.actions;
export default signupSlice;
