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

  dataNewPost: null,
  errorNewPost: null,
  isLoadingNewPost: null,
};

const newPostSlice = createSlice({
  name: "newPost",
  initialState,
  reducers: {
    toggleWindow(state, action) {
      state.isWindowOpenNewPost = !state.isWindowOpenNewPost;

      if (state.isWindowOpenNewPost === true) {
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";
      } else {
        document.body.style.overflow = "scroll";
        document.body.style.height = "auto";
      }
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

    success(state, action) {
      state.dataNewPost = action.payload;
    },

    fail(state, action) {
      state.errorNewPost = action.payload;
    },

    loading(state, action) {
      state.isLoadingNewPost = action.payload;
    },
  },
});

export const newPostActions = newPostSlice.actions;
export default newPostSlice;
