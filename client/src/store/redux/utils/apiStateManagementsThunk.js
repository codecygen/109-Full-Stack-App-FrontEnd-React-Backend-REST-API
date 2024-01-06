import { allPostsActions } from "../all-posts.slice";
import { editPostActions } from "../edit-post-slice";

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
    dispatch(editPostActions.toggleWindow());
    await getOnePost(
      id,
      dispatch,
      editPostActions.success,
      editPostActions.loading,
      editPostActions.fail
    );
  };
};
