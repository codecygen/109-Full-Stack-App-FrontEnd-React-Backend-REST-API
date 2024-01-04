import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import DB from "../../../database/posts.json";

import classes from "./eventDetailsPage.module.scss";

const EventIdPage = () => {
  const params = useParams();

  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const foundData = DB.find(post => post._id === params.id);
    setPostData(foundData);
  }, [params.id]);

  console.log(postData);

  return (
    <main className={classes.details}>
      <div>
        <p>{params.title}</p>
        <p>{params.id}</p>
      </div>
    </main>
  );
};

export default EventIdPage;
