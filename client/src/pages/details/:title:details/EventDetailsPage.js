import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

import { getDetailsPagePost } from "../../../store/redux/utils/apiStateManagementsThunk";

import Loader from "../../../components/Loader";

import convertDate from "../../../utils/convertDate";

import classes from "./eventDetailsPage.module.scss";

const EventIdPage = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { responseDetailedPost, errorDetailedPost, isLoadingDetailedPost } =
    useSelector((state) => state.detailedPost);

  useEffect(() => {
    dispatch(getDetailsPagePost(params.id));
  }, [dispatch, params.id]);

  const {
    title,
    image,
    details,
    creator: { name: creatorName },
    createdAt,
    updatedAt,
  } = responseDetailedPost ?? {
    title: null,
    image: null,
    details: null,
    creator: { name: null },
    createdAt: null,
    updatedAt: null,
  };

  return (
    <main className={classes.details}>
      {errorDetailedPost && (
        <section className={classes.center}>
          <p>{errorDetailedPost}</p>
        </section>
      )}

      {isLoadingDetailedPost && (
        <section className={classes.center}>
          <Loader />
        </section>
      )}

      <div>
        <div>
          <p>
            <strong>Created: </strong>
            {convertDate(createdAt)}
          </p>
          <p>
            <strong>Last updated: </strong>
            {convertDate(updatedAt)}
          </p>
          <p className={classes.author}>
            <strong>Written by: </strong>
            {creatorName}
          </p>
        </div>

        <h1>{title}:</h1>
        <img src={image} alt="no-img" />
        <ReactMarkdown remarkPlugins={[remarkBreaks]}>{details}</ReactMarkdown>
      </div>
    </main>
  );
};

export default EventIdPage;
