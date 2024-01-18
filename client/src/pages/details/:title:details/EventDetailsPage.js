import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { getDetailsPagePost } from "../../../store/redux/utils/apiStateManagementsThunk";

import classes from "./eventDetailsPage.module.scss";

const EventIdPage = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { responseDetailedPost, errorDetailedPost, isLoadingDetailedPost } =
    useSelector((state) => state.detailedPost);

  useEffect(() => {
    dispatch(getDetailsPagePost(params.id));
  }, [dispatch, params.id]);

  console.log("State");
  console.log(isLoadingDetailedPost);
  console.log(errorDetailedPost);
  console.log(responseDetailedPost);

  if (errorDetailedPost) {
    return (
      <main className={classes.details}>
        <div>
          <p>Error!</p>
        </div>
      </main>
    );
  } else if (isLoadingDetailedPost || !responseDetailedPost) {
    return (
      <main className={classes.details}>
        <div>
          <p>Loading</p>
        </div>
      </main>
    );
  }

  const {
    title,
    image,
    details,
    creator: { name: creatorName },
    createdAt,
    updatedAt,
  } = responseDetailedPost;

  return (
    <main className={classes.details}>
      <div>
        <h1>{title}</h1>
        <p>{createdAt}</p>
        <p>{updatedAt}</p>
        <img src={image} alt="error-showing" />
        <p>{details}</p>
        <p>{creatorName}</p>
      </div>
    </main>
  );
};

export default EventIdPage;
