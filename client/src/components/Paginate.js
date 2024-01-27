import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import classes from "./Paginate.module.scss";

const Paginate = () => {
  const navigate = useNavigate();

  const {
    currentPageAllPosts,
    totalPagesAllPosts,
    totalPostsAllPosts,
  } = useSelector((state) => state.allPosts);

  const handlePageChange = (event, page) => {
    navigate(`/?p=${page}`);
  };

  return (
    <div className={classes.paginate}>
      <p>Total Posts: {totalPostsAllPosts}</p>
      <Stack spacing={2}>
        <Pagination
          count={+totalPagesAllPosts}
          color="primary"
          onChange={handlePageChange}
          page={+currentPageAllPosts}
        />
      </Stack>
    </div>
  );
};

export default Paginate;
