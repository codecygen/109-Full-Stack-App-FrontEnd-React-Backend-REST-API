import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  titleCheckResult: {
    isValid: null,
    warningMessage: "",
  },

  imageCheckResult: {
    isValid: null,
    fileUrl: "",
    warningMessage: "",
  },

  detailsCheckResult: {
    isValid: null,
    warningMessage: "",
  },

  isFormValid: null,
};

const postFormValiditySlice = createSlice({
  name: "postFormValidity",
  initialState,
  reducers: {
    textValidityChecker(state, action) {
      const { enteredInput, inputField } = action.payload;

      const isInputValid = enteredInput.trim().length >= 5;

      if (inputField === "title-input") {
        state.titleCheckResult.isValid = isInputValid ? true : false;
        state.titleCheckResult.warningMessage = isInputValid ? "" : "Min 5 characters!";
      } else if (inputField === "details-input") {
        state.detailsCheckResult.isValid = isInputValid ? true : false;
        state.detailsCheckResult.warningMessage = isInputValid ? "" : "Min 5 characters!";
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
        state.imageCheckResult.warningMessage = ""
      } else {
        state.imageCheckResult.isValid = false;
        state.imageCheckResult.fileUrl = "";
        state.imageCheckResult.warningMessage = "Not an image file!"
      }
    },

    resetFormValidity(state) {
      return initialState;
    },
  },
});

export const postFormValidityActions = postFormValiditySlice.actions;
export default postFormValiditySlice;
