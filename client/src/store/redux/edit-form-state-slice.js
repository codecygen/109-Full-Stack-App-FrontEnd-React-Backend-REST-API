import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditFormOpen: false,
  postID: null,
  titleDB: "",
  detailsDB: "",
};

const editFormSlice = createSlice({
  name: "editFormSlice",
  initialState,
  reducers: {
    openAndPopulateWindow(state, action) {
      const postData = action.payload;

      state.isEditFormOpen = true;
      state.postID = postData._id;
      state.titleDB = postData.title;
      state.detailsDB = postData.details;
    },
  },
});

export const editFormSliceActions = editFormSlice.actions;
export default editFormSlice;
