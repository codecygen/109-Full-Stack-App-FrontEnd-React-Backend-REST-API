import classes from "./FeedPage.module.scss";

const FeedPage = (props) => {
  const dummyPostData = [
    {
      title: "Title 1",
      creator: {
        name: "Aras",
      },
      createdAt: new Date("2023-12-19T15:00:13.206+00:00"),
    },
    {
      title: "Title 2",
      creator: {
        name: "Vahit",
      },
      createdAt: new Date("2023-12-11T15:08:29.560+00:00"),
    },
  ];

  // const dummyPostData = [];

  const postContent = dummyPostData.map((post) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    const formattedDate = post.createdAt.toLocaleDateString("en-US", options);

    return (
      <div className={classes.post}>
        <p>
          Posted by {post.creator.name} on {formattedDate}
        </p>
        <h1>{post.title}</h1>
        <button>View</button>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    );
  });

  return (
    <main className={classes.main}>
      <button className={classes.button5} onClick={props.openMessageWindow}>
        New Post
      </button>
      <section className={classes.posts}>
        {dummyPostData && dummyPostData.length > 0 ? (
          postContent
        ) : (
          <div>No Post Yet</div>
        )}
      </section>
    </main>
  );
};

export default FeedPage;
