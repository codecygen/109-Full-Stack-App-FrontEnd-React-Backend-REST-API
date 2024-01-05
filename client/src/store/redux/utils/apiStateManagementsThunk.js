import { postsPagePostsActions } from "../posts-page-posts-slice";
import { editFormSliceActions } from "../edit-form-state-slice";

import getAllPosts from "./api/getAllPosts";
import getOnePost from "./api/getOnePost";

export const getPostsPagePosts = () => {
  return async (dispatch) => {
    await getAllPosts(
      dispatch,
      postsPagePostsActions.getAllSuccess,
      postsPagePostsActions.getAllLoading,
      postsPagePostsActions.getAllFail
    );
  };
};

export const getEditWindowPost = (id) => {
  return async (dispatch) => {
    dispatch(editFormSliceActions.openWindow());
    await getOnePost(
      dispatch,
      id,
      editFormSliceActions.getOneSuccess,
      editFormSliceActions.getOneLoading,
      editFormSliceActions.getOneFail
    );
  };
};
