import { createSlice } from "@reduxjs/toolkit";

const postFormValiditySlice = createSlice({
  name: "postFormValidity",
  initialState: {
    isTitleValid: null,

    imageCheckResult: {
      isValid: null,
      fileUrl: "",
      previewMessage: "Please choose an image!",
    },

    isMessageValid: null,
    isFormValid: null,
  },
  reducers: {
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
