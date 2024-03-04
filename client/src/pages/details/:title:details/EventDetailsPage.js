import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

import { getDetailsPagePost } from "../../../store/redux/utils/apiStateManagementsThunk";

import Loader from "../../../components/Loader";
import CommentForm from "../../../components/CommentForm";
import Comments from "../../../components/Comments";
import DeleteCommentModal from "../../../components/modals/delete-comment-modal/DeleteCommentModal";

import convertDate from "../../../utils/convertDate";

import getAPI from "../../../store/redux/utils/config/getAPI";

import { getComments } from "../../../store/redux/utils/apiStateManagementsThunk";

import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import classes from "./eventDetailsPage.module.scss";

const EventIdPage = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { responseDetailedPost, errorDetailedPost, isLoadingDetailedPost } =
    useSelector((state) => state.detailedPost);

  const isWindowOpenDeleteComment = useSelector(
    (state) => state.deleteComment.isWindowOpenDeleteComment
  );

  useEffect(() => {
    dispatch(getDetailsPagePost(params.id));

    dispatch(getComments(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (isWindowOpenDeleteComment) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "scroll";
      document.body.style.height = "auto";
    }
  }, [isWindowOpenDeleteComment]);

  const {
    title,
    image,
    details,
    creator: { name: creatorName, status: creatorStatus, color: creatorColor },
    updatedAt,
  } = responseDetailedPost ?? {
    title: null,
    image: null,
    details: null,
    creator: { name: null, status: null, color: null },
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

      {isLoadingDetailedPost === false && errorDetailedPost === false && (
        <div>
          <div>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: creatorColor }}>
                {creatorName.charAt(0) + creatorName.charAt(1)}
              </Avatar>
            </ListItemAvatar>
            <p className={classes.author}>
              <strong>Author: </strong>
              {creatorStatus === "admin" && (
                <FontAwesomeIcon icon={faStar} style={{ color: "#b4a011" }} />
              )}
              {creatorName}
            </p>
            <p>
              <strong>Updated: </strong>
              {convertDate(updatedAt)}
            </p>
          </div>

          <h1>{title}</h1>
          <img src={`${getAPI.link}/${image}`} alt="no-img" />
          <ReactMarkdown remarkPlugins={[remarkBreaks]}>
            {details}
          </ReactMarkdown>
          <CommentForm />
          <Comments />
        </div>
      )}
      {isWindowOpenDeleteComment && <DeleteCommentModal />}
    </main>
  );
};

export default EventIdPage;
