import { configureStore } from "@reduxjs/toolkit";

import postFormValiditySlice from "./post-form-validity-slice";

const store = configureStore({
  reducer: { postFormValidity: postFormValiditySlice.reducer },
});

export default store;
