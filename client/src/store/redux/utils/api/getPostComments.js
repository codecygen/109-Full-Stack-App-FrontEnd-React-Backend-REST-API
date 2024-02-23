import getAPI from "../config/getAPI";

const getPostComments = async (postId, dispatch) => {
  try {
    const res = await fetch(getAPI.getComments(postId));

    if (!res.ok) {
      throw new Error(`HTTP error! Status Code: ${res.status}`);
    }

    const data = res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export default getPostComments;
