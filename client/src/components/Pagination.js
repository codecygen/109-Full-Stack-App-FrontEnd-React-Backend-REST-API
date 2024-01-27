import React from "react";

import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import classes from "./Pagination.module.scss";

const Pagination = () => {
  const { currentPageAllPosts, totalPagesAllPosts, totalPostsAllPosts } =
    useSelector((state) => state.allPosts);

  // <p>totalPosts: {totalPostsAllPosts}</p>
  // <p>totalPage: {totalPagesAllPosts}</p>
  // <p>currentPage: {currentPageAllPosts}</p>

  return (
    <ul className={classes.pagination}>
      <li>
        <FontAwesomeIcon icon={faAngleLeft} size="xl" />
        Prev
      </li>
      <li>
        <NavLink
          className={(state) => (state.isActive ? classes.active : "")}
          to="/?p=1"
        >
          1
        </NavLink>
      </li>
      <li>...</li>
      <li>
        <NavLink
          className={(state) => (state.isActive ? classes.active : "")}
          to="/?p=3"
        >
          3
        </NavLink>
      </li>
      <li>
        <NavLink
          className={(state) => (state.isActive ? classes.active : "")}
          to="/?p=4"
        >
          4
        </NavLink>
      </li>
      <li>
        <NavLink
          className={(state) => (state.isActive ? classes.active : "")}
          to="/?p=5"
        >
          5
        </NavLink>
      </li>
      <li>...</li>
      <li>
        <NavLink
          className={(state) => (state.isActive ? classes.active : "")}
          to="/?p=20"
        >
          20
        </NavLink>
      </li>
      <li>
        Next
        <FontAwesomeIcon icon={faAngleRight} size="xl" />
      </li>
    </ul>
  );
};

export default Pagination;
