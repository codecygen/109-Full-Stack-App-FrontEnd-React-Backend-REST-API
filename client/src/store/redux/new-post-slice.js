import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isWindowOpenNewPost: false,

  titleCheckResult: {
    isValid: null,
    enteredTitle: "",
    warningMessage: "",
  },

  imageCheckResult: {
    isValid: null,
    fileUrl: "",
    warningMessage: "",
  },

  detailsCheckResult: {
    isValid: null,
    enteredDetails: "",
    warningMessage: "",
  },

  isFormValid: null,
};

const newPostSlice = createSlice({
  name: "newPost",
  initialState,
  reducers: {
    toggleWindow(state, action) {
      state.isWindowOpenNewPost = !state.isWindowOpenNewPost;
    },

    reset(state, action) {
      return initialState;
    },

    checkText(state, action) {
      const { enteredInput, inputField } = action.payload;

      const enteredInputTrimmed = enteredInput.trim();
      const isInputValid = enteredInputTrimmed.length >= 5;

      if (inputField === "title-input") {
        state.titleCheckResult.isValid = isInputValid ? true : false;
        state.titleCheckResult.warningMessage = isInputValid
          ? ""
          : "Min 5 characters!";

        state.titleCheckResult.enteredTitle = isInputValid
          ? enteredInputTrimmed
          : "";
      } else if (inputField === "details-input") {
        state.detailsCheckResult.isValid = isInputValid ? true : false;
        state.detailsCheckResult.warningMessage = isInputValid
          ? ""
          : "Min 5 characters!";

        state.detailsCheckResult.enteredDetails = isInputValid
          ? enteredInputTrimmed
          : "";
      }
    },

    checkImage(state, action) {
      const { fileData, fileUrl } = action.payload;

      const fileExtension = fileData.name.split(".").pop();
      const validFileExtensions = ["jpg", "jpeg", "png", "gif"];
      const isImageFile = validFileExtensions.includes(fileExtension);

      if (isImageFile) {
        state.imageCheckResult.isValid = true;
        state.imageCheckResult.fileUrl = fileUrl;
        state.imageCheckResult.warningMessage = "";
      } else {
        state.imageCheckResult.isValid = false;
        state.imageCheckResult.fileUrl = "";
        state.imageCheckResult.warningMessage = "Invalid file!";
      }
    },
  },
});

export const newPostActions = newPostSlice.actions;
export default newPostSlice;
