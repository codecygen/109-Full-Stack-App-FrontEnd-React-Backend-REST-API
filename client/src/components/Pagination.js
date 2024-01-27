import React from "react";

import { useSelector } from "react-redux";

const Pagination = () => {
  const { currentPageAllPosts, totalPagesAllPosts, totalPostsAllPosts } =
    useSelector((state) => state.allPosts);

  return (
    <>
      <p>totalPosts: {totalPostsAllPosts}</p>
      <p>totalPage: {totalPagesAllPosts}</p>
      <p>currentPage: {currentPageAllPosts}</p>
    </>
  );
};

export default Pagination;
