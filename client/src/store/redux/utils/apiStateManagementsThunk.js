import { allPostsActions } from "../all-posts.slice";
import { editFormSliceActions } from "../edit-form-state-slice";

import getAllPosts from "./api/getAllPosts";
import getOnePost from "./api/getOnePost";

export const getPostsPagePosts = () => {
  return async (dispatch) => {
    await getAllPosts(
      dispatch,
      allPostsActions.success,
      allPostsActions.loading,
      allPostsActions.fail
    );
  };
};

export const getEditWindowPost = (id) => {
  return async (dispatch) => {
    dispatch(editFormSliceActions.openWindow());
    await getOnePost(
      id,
      dispatch,
      editFormSliceActions.success,
      editFormSliceActions.loading,
      editFormSliceActions.fail
    );
  };
};
