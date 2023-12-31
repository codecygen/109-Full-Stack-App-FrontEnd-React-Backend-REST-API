import { useDispatch, useSelector } from "react-redux";

import { postFormValidityActions } from "../../store/redux/post-form-validity-slice";

import NewPostModal from "../../components/NewPostModal";

import classes from "./EventsPage.module.scss";

const FeedPage = (props) => {
  const dispatch = useDispatch();
  const isPostWindowOpen = useSelector(
    (state) => state.postFormValidity.isPostFormOpen
  );

  const dummyPostData = [
    {
      _id: 1,
      title: "Title 1",
      creator: {
        name: "Aras",
      },
      createdAt: new Date("2023-12-19T15:00:13.206+00:00"),
    },
    {
      _id: 2,
      title: "Title 2",
      creator: {
        name: "Vahit",
      },
      createdAt: new Date("2023-12-11T15:08:29.560+00:00"),
    },
  ];

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

  const postContent = dummyPostData.map((post) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    const formattedDate = post.createdAt.toLocaleDateString("en-US", options);

    const deleteButtonHandler = (postData) => {
      console.log(post);
    };

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
            onClick={deleteButtonHandler.bind(null, post)}
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
        {dummyPostData && dummyPostData.length > 0 ? (
          postContent
        ) : (
          <div>No Post Yet</div>
        )}
      </section>

      {/* Message Posting Window */}
      {isPostWindowOpen && <NewPostModal cancelWindow={closePostWindow} />}
    </main>
  );
};

export default FeedPage;
