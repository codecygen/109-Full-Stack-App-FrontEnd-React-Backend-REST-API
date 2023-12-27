import { useDispatch, useSelector } from "react-redux";

import { postFormValidityActions } from "../store/redux/post-form-validity-slice";

import classes from "./NewPostOverlay.module.scss";

const NewPostOverlay = (props) => {
  const dispatch = useDispatch();

  const titleResult = useSelector(
    (state) => state.postFormValidity.titleCheckResult
  );

  const messageResult = useSelector(
    (state) => state.postFormValidity.messageCheckResult
  );

  const imageResult = useSelector(
    (state) => state.postFormValidity.imageCheckResult
  );

  console.log("title: ", titleResult.isValid);
  console.log("image :", imageResult.isValid);
  console.log("message: ", messageResult.isValid);

  const titleChangeHandler = (e) => {
    const enteredTitle = e.target.value;
    const inputField = e.target.name;

    dispatch(
      postFormValidityActions.titleValidityChecker({
        enteredInput: enteredTitle,
        inputField,
      })
    );
  };

  const imageChangeHandler = (e) => {
    const file = e.target.files[0];

    // file varaible is a File object which is nonserializable.
    // We have to make it serializable
    const fileData = {
      name: file.name,
      size: file.size,
      type: file.type,
    };

    const fileUrl = URL.createObjectURL(file);

    dispatch(
      postFormValidityActions.imageValidityChecker({ fileData, fileUrl })
    );
  };

  const messageChangeHandler = (e) => {
    const enteredMessage = e.target.value;
    const inputField = e.target.name;

    dispatch(
      postFormValidityActions.titleValidityChecker({
        enteredInput: enteredMessage,
        inputField,
      })
    );
  };

  return (
    <section className={classes.form}>
      <header>
        <h1>Create a Post</h1>
      </header>

      <form>
        <div className={classes.input}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title-input"
            placeholder="Title..."
            type="text"
            onChange={titleChangeHandler}
          />
        </div>
        <div className={classes.input}>
          <label htmlFor="image">Image</label>
          <input id="image" type="file" onChange={imageChangeHandler} />
        </div>
        {/* show-image-preview */}
        <div className={classes["image-preview"]}>
          {!imageResult.fileUrl && <p>{imageResult.previewMessage}</p>}
          {imageResult.fileUrl && (
            <img src={imageResult.fileUrl} alt="Wrong file type!" />
          )}
        </div>
        <div className={classes.input}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message-input"
            placeholder="Message..."
            type="text"
            onChange={messageChangeHandler}
          />
        </div>
      </form>

      <div>
        <button className={classes.button3} onClick={props.cancelFunc}>
          Cancel
        </button>
        <button className={classes.button2}>Send</button>
      </div>
    </section>
  );
};

export default NewPostOverlay;
