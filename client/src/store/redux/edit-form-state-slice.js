import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditFormOpen: false,
  postID: null,
  editedTitle: "",
  editedDetails: "",
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

    editFormCloseHandler(state, action) {
      state.isEditFormOpen = false;
    },

    editFormOpenHandler(state, action) {
      state.isEditFormOpen = true;
    },

    resetStates(state, action) {
      return initialState;
    },
  },
});

export const editFormSliceActions = editFormSlice.actions;
export default editFormSlice;
