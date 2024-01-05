import React from "react";
import classes from "./404.module.scss";

const NotFoundPage = () => {
  return (
    <main className={classes.error}>
      <h1>404 Page</h1>
      <p>Not Found!</p>
    </main>
  );
};

export default NotFoundPage;
