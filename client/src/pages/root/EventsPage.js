import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { postFormValidityActions } from "../../store/redux/post-form-validity-slice";

import NewPostModal from "../../components/modals/post-modal/NewPostModal";
import DeletePostModal from "../../components/modals/delete-post-modal/DeletePostModal";

import classes from "./EventsPage.module.scss";

import postData from "../../database/posts.json";

const FeedPage = (props) => {
  const [isDeletePostWindowOpen, setIsDeletePostWindowOpen] = useState(false);

  const dispatch = useDispatch();
  const isPostWindowOpen = useSelector(
    (state) => state.postFormValidity.isPostFormOpen
  );

  const closePostWindow = () => {
    dispatch(postFormValidityActions.postFormToggleHandler());
    dispatch(postFormValidityActions.resetFormValidity());

    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
  };

  const openPostWindow = () => {
    dispatch(postFormValidityActions.postFormToggleHandler());

    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
  };

  const closeDeletePostWindow = () => {
    setIsDeletePostWindowOpen(false);
    console.log("Delete window closed!");
  };

  const openDeletePostWindow = (postData) => {
    setIsDeletePostWindowOpen(true);
    console.log(postData);
    console.log("Delete window opened!");
  };

  const postContent = postData.map((post) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    const formattedDate = new Date(post.createdAt).toLocaleDateString(
      "en-US",
      options
    );

    return (
      <div className={classes.post} key={post._id}>
        <p>
          Posted by {post.creator.name} on {formattedDate}
        </p>
        <h1>{post.title}</h1>
        <div className={classes.buttons}>
          <button className={classes.button1}>View</button>
          <button className={classes.button1}>Edit</button>
          <button
            className={classes.button4}
            onClick={openDeletePostWindow.bind(null, post)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });

  return (
    <main className={classes.main}>
      <button className={classes.button5} onClick={openPostWindow}>
        New Event
      </button>
      <section className={classes.posts}>
        {postData && postData.length > 0 ? postContent : <div>No Post Yet</div>}
      </section>

      {/* Message Posting Window */}
      {isPostWindowOpen && <NewPostModal cancelWindow={closePostWindow} />}

      {isDeletePostWindowOpen && (
        <DeletePostModal cancelWindow={closeDeletePostWindow} />
      )}
    </main>
  );
};

export default FeedPage;
