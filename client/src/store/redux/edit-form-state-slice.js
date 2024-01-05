import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditFormOpen: false,
  editError: null,
  isEditLoading: null,
  editData: null,
};

const editFormSlice = createSlice({
  name: "editFormSlice",
  initialState,
  reducers: {
    openAndPopulateWindow(state, action) {
      const postData = action.payload;

      state.isEditFormOpen = true;
      state.postID = postData._id;
      state.editedTitle = postData.title;
      state.editedDetails = postData.details;
    },

    openWindow(state, action) {
      state.isEditFormOpen = true;
    },

    editFormCloseHandler(state, action) {
      state.isEditFormOpen = false;
    },

    editFormOpenHandler(state, action) {
      state.isEditFormOpen = true;
    },

    resetStates(state, action) {
      return initialState;
    },

    getOneSuccess(state, action) {
      console.log(action.payload);
      state.editData = action.payload;
    },

    getOneFail(state, action) {
      console.log(action.payload);
      state.editError = action.payload;
    },

    getOneLoading(state, action) {
      console.log(action.payload);
      state.isEditLoading = action.payload;
    },
  },
});

export const editFormSliceActions = editFormSlice.actions;
export default editFormSlice;
