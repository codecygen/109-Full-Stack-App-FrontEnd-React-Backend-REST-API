import { configureStore } from "@reduxjs/toolkit";

import formValiditySlice from "./form-validity-slice";

const store = configureStore({
  reducer: { formValidity: formValiditySlice.reducer },
});

export default store;
