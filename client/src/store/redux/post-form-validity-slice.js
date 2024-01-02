import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPostFormOpen: false,

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

const postFormValiditySlice = createSlice({
  name: "postFormValidity",
  initialState,
  reducers: {
    postFormToggleHandler(state, action) {
      state.isPostFormOpen = !state.isPostFormOpen;
    },

    resetFormValidity(state, action) {
      return initialState;
    },

    textValidityChecker(state, action) {
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

    imageValidityChecker(state, action) {
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
        state.imageCheckResult.warningMessage = "Not an image file!";
      }
    },
  },
});

export const postFormValidityActions = postFormValiditySlice.actions;
export default postFormValiditySlice;
