import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  titleCheckResult: {
    isValid: null,
  },

  imageCheckResult: {
    isValid: null,
    fileUrl: "",
    previewMessage: "Please choose an image!",
  },

  detailsCheckResult: {
    isValid: null,
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
        isInputValid
          ? (state.titleCheckResult.isValid = true)
          : (state.titleCheckResult.isValid = false);
      } else if (inputField === "details-input") {
        isInputValid
          ? (state.detailsCheckResult.isValid = true)
          : (state.detailsCheckResult.isValid = false);
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
      } else {
        state.imageCheckResult.isValid = false;
        state.imageCheckResult.fileUrl = "";
        state.imageCheckResult.previewMessage = "Not an image file!";
      }
    },

    resetFormValidity(state) {
      return initialState;
    },
  },
});

export const postFormValidityActions = postFormValiditySlice.actions;
export default postFormValiditySlice;
