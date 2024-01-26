const API_LINK = "http://localhost:4000";

class getAPI {
  static link = API_LINK;
  // static getAllPosts = `${this.link}/feed/posts`;
  static postOnePost = `${this.link}/feed/post`;

  static getAllPosts(currentPage) {
    return `${this.link}/feed/posts/?page=${currentPage}`;
  }

  static getOnePost(id) {
    return `${this.link}/feed/post/${id}`;
  }

  static updateOnePost(id) {
    return `${this.link}/feed/update/${id}`;
  }

  static deleteOnePost(id) {
    return `${this.link}/feed/delete/${id}`;
  }
}

export default getAPI;
