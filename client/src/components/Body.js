import FeedBody from "../sections/FeedBody";
import LoginBody from "../sections/LoginBody";

import classes from "./Body.module.scss";

const Body = (props) => {
  const bodyContent =
    props.currentPage === "Feed" ? <FeedBody /> : <LoginBody />;

  return (
    <main className={classes.body}>
      {bodyContent}
    </main>
  );
};

export default Body;
