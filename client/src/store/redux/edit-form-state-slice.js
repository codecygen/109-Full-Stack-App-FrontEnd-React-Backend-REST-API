import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isWindowOpenEditForm: false,
  dataEditForm: null,
  errorEditForm: null,
  isLoadingEditForm: null,
};

const editFormSlice = createSlice({
  name: "editFormSlice",
  initialState,
  reducers: {
    openWindow(state, action) {
      state.isWindowOpenEditForm = true;
    },

    closeWindow(state, action) {
      state.isWindowOpenEditForm = false;
    },

    resetStates(state, action) {
      return initialState;
    },

    success(state, action) {
      state.dataEditForm = action.payload;
    },

    fail(state, action) {
      state.errorEditForm = action.payload;
    },

    loading(state, action) {
      state.isLoadingEditForm = action.payload;
    },
  },
});

export const editFormSliceActions = editFormSlice.actions;
export default editFormSlice;
