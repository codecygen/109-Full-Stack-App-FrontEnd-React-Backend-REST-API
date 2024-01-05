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
    openWindow(state, action) {
      state.isEditFormOpen = true;
    },

    editFormCloseHandler(state, action) {
      state.isEditFormOpen = false;
    },

    resetStates(state, action) {
      return initialState;
    },

    success(state, action) {
      state.editData = action.payload;
    },

    fail(state, action) {
      state.editError = action.payload;
    },

    loading(state, action) {
      state.isEditLoading = action.payload;
    },
  },
});

export const editFormSliceActions = editFormSlice.actions;
export default editFormSlice;
