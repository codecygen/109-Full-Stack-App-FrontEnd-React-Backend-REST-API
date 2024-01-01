import { configureStore } from "@reduxjs/toolkit";

import postFormValiditySlice from "./post-form-validity-slice";
import deleteWindowStateSlice from "./delete-window-state-slice";

const store = configureStore({
  reducer: {
    postFormValidity: postFormValiditySlice.reducer,
    deleteWindowState: deleteWindowStateSlice.reducer,
  },
});

export default store;
