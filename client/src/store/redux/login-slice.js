import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEmailValid: null,
  isPasswordValid: null,
  isFormValid: null,

  dataLoginUser: null,
  errorLoginUser: null,
  isLoadingLoginUser: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    checkEmail(state, action) {
      const email = action.payload;

      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      state.isEmailValid = emailRegex.test(email);
    },

    checkPassword(state, action) {
      const password = action.payload;

      state.isPasswordValid = password.trim().length >= 6;
    },

    checkForm(state, action) {
      state.isFormValid = state.isEmailValid && state.isPasswordValid;
    },

    resetState(state, action) {
      return initialState;
    },

    success(state, action) {
      state.dataLoginUser = action.payload;
    },

    fail(state, action) {
      state.errorLoginUser = action.payload;
    },

    loading(state, action) {
      state.isLoadingLoginUser = action.payload;
    },
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice;
