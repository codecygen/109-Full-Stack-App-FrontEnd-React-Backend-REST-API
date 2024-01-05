import { connectApiSliceActions } from "../connect-api-slice";
import { editFormSliceActions } from "../edit-form-state-slice";

import getAllPosts from "./database/getAllPosts";

export const getPostsPagePosts = () => {
  return async (dispatch) => {
    getAllPosts(
      dispatch,
      connectApiSliceActions.getAllSuccess,
      connectApiSliceActions.getAllLoading,
      connectApiSliceActions.getAllFail,
    );
  };
};

export const getOne = (id) => {
  return async (dispatch) => {
    dispatch(editFormSliceActions.getOneLoading(true));
    dispatch(editFormSliceActions.getOneFail(false));
    dispatch(editFormSliceActions.openWindow());

    try {
      const res = await fetch("/database/posts.json");
      if (!res.ok) {
        throw new Error(`HTTP error! Status Code: ${res.status}`);
      }

      const result = await res.json();
      const data = result.find((entry) => entry._id === id);
      dispatch(editFormSliceActions.getOneSuccess(data));
      dispatch(editFormSliceActions.getOneLoading(false));
      return data;
    } catch (err) {
      dispatch(editFormSliceActions.getOneFail(err.message));
      dispatch(editFormSliceActions.getOneLoading(false));
    }
  };
};
