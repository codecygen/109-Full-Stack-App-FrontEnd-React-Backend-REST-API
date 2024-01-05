import { connectApiSliceActions } from "../connect-api-slice";
import { editFormSliceActions } from "../edit-form-state-slice";

export const getAll = () => {
  return async (dispatch) => {
    dispatch(connectApiSliceActions.getAllLoading(true));
    dispatch(connectApiSliceActions.getAllFail(false));

    try {
      const res = await fetch("/database/posts.json");
      if (!res.ok) {
        throw new Error(`HTTP error! Status Code: ${res.status}`);
      }

      const data = await res.json();
      dispatch(connectApiSliceActions.getAllSuccess(data));
      dispatch(connectApiSliceActions.getAllLoading(false));
      return data;
    } catch (err) {
      dispatch(connectApiSliceActions.getAllFail(err.message));
      dispatch(connectApiSliceActions.getAllLoading(false));
    }
  };
};

export const getOne = (id) => {
  return async (dispatch) => {
    dispatch(connectApiSliceActions.getOneLoading(true));
    dispatch(connectApiSliceActions.getOneFail(false));

    try {
      const res = await fetch("/database/posts.json");
      if (!res.ok) {
        throw new Error(`HTTP error! Status Code: ${res.status}`);
      }

      const result = await res.json();
      const data = result.find(entry => entry._id === id)
      dispatch(connectApiSliceActions.getOneSuccess(data));
      dispatch(connectApiSliceActions.getOneLoading(false));
      return data;
    } catch (err) {
        dispatch(connectApiSliceActions.getOneFail(err.message));
        dispatch(connectApiSliceActions.getOneLoading(false));
    }
  };
};
