import { useDispatch, useSelector } from "react-redux";

import { postFormValidityActions } from "../store/redux/post-form-validity-slice";

import classes from "./NewPostOverlay.module.scss";

const NewPostOverlay = (props) => {
  const dispatch = useDispatch();

  const titleResult = useSelector(
    (state) => state.postFormValidity.titleCheckResult
  );

  const messageResult = useSelector(
    (state) => state.postFormValidity.detailsCheckResult
  );

  const imageResult = useSelector(
    (state) => state.postFormValidity.imageCheckResult
  );

  console.log("title: ", titleResult.isValid);
  console.log("image :", imageResult.isValid);
  console.log("details: ", messageResult.isValid);

  const titleChangeHandler = (e) => {
    const enteredTitle = e.target.value;
    const inputField = e.target.name;

    dispatch(
      postFormValidityActions.textValidityChecker({
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

  const detailChangeHandler = (e) => {
    const detailMessage = e.target.value;
    const inputField = e.target.name;

    dispatch(
      postFormValidityActions.textValidityChecker({
        enteredInput: detailMessage,
        inputField,
      })
    );
  };

  return (
    <section className={classes.form}>
      <header>
        <h1>Create an Event</h1>
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
          <label htmlFor="details">Details</label>
          <textarea
            id="details"
            name="details-input"
            placeholder="Details..."
            type="text"
            onChange={detailChangeHandler}
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
