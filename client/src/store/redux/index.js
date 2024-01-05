import { configureStore } from "@reduxjs/toolkit";

import postFormValiditySlice from "./post-form-validity-slice";
import deleteWindowStateSlice from "./delete-window-state-slice";
import editFormStateSlice from "./edit-form-state-slice";
import connectApiSlice from "./connect-api-slice";

const store = configureStore({
  reducer: {
    postFormValidity: postFormValiditySlice.reducer,
    deleteWindowState: deleteWindowStateSlice.reducer,
    editFormSlice: editFormStateSlice.reducer,
    connectApi: connectApiSlice.reducer,
  },
});

export default store;
