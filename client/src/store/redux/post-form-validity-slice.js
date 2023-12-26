import { createSlice } from "@reduxjs/toolkit";

const postFormValiditySlice = createSlice({
  name: "postFormValidity",
  initialState: {
    titleCheckResult: {
      isValid: null,
    },

    imageCheckResult: {
      isValid: null,
      fileUrl: "",
      previewMessage: "Please choose an image!",
    },

    messageCheckResult: {
      isValid: null,
    },

    isFormValid: null,
  },
  reducers: {
    titleValidityChecker(state, action) {
      const { enteredInput, inputField } = action.payload;

      const isInputValid = enteredInput.trim().length >= 5;

      if (inputField === "title-input") {
        isInputValid
          ? (state.titleCheckResult.isValid = true)
          : (state.titleCheckResult.isValid = false);
      } else if (inputField === "message-input") {
        isInputValid
          ? (state.messageCheckResult.isValid = true)
          : (state.messageCheckResult.isValid = false);
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
  },
});

export const postFormValidityActions = postFormValiditySlice.actions;
export default postFormValiditySlice;
