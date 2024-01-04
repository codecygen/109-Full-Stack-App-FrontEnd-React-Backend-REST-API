import { useParams } from "react-router-dom";

import classes from "./eventDetailsPage.module.scss";

const EventIdPage = () => {
  const params = useParams();

  return (
    <main className={classes.details}>
      <div>
      <p>{params.title}</p>
      <p>{params.id}</p></div>
    </main>
  );
};

export default EventIdPage;
