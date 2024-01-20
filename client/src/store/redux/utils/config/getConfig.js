const getConfig = () => {
  const API_ENDPOINT = "http://localhost:4000";

  const getAllPostsEndpoint = () => {
    return `${API_ENDPOINT}/feed/posts`;
  };

  const getOnePostEndpoint = (id) => {
    return `${API_ENDPOINT}/feed/post/${id}`;
  };

  const postOnePostEndpoint = () => {
    return `${API_ENDPOINT}/feed/post`;
  };

  const updateOnePostEndpoint = (id) => {
    return `${API_ENDPOINT}/feed/update/${id}`
  }

  const deleteOnePostEndpoint = (id) => {
    return `${API_ENDPOINT}/feed/delete/${id}`;
  };

  return {
    getAllPostsEndpoint,
    getOnePostEndpoint,
    postOnePostEndpoint,
    updateOnePostEndpoint,
    deleteOnePostEndpoint,
  };
};

export default getConfig;