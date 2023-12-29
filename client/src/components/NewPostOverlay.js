import { useDispatch, useSelector } from "react-redux";

import { postFormValidityActions } from "../store/redux/post-form-validity-slice";

import classes from "./NewPostOverlay.module.scss";

const NewPostOverlay = (props) => {
  const dispatch = useDispatch();

  const titleResult = useSelector(
    (state) => state.postFormValidity.titleCheckResult
  );

  const detailsResult = useSelector(
    (state) => state.postFormValidity.detailsCheckResult
  );

  const imageResult = useSelector(
    (state) => state.postFormValidity.imageCheckResult
  );

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

  const postEventHandler = () => {
    const isTitleValid = titleResult.isValid;
    const isImageValid = imageResult.isValid;
    const isDetailsValid = detailsResult.isValid;

    if (!isTitleValid || !isImageValid || !isDetailsValid) {
      console.error("Form is not valid!");
      return;
    }

    console.log("Form submitted!");
  };

  let titleClass;

  if (titleResult.isValid === null) {
    titleClass = "";
  } else if (titleResult.isValid === true) {
    titleClass = classes["input-valid"];
  } else if (titleResult.isValid === false) {
    titleClass = classes["input-invalid"];
  }

  let imageClass;

  if (imageResult.isValid === null) {
    imageClass = "";
  } else if (imageResult.isValid === true) {
    imageClass = classes["img-valid"];
  } else if (imageResult.isValid === false) {
    imageClass = classes["img-invalid"];
  }

  let detailsClass;

  if (detailsResult.isValid === null) {
    detailsClass = "";
  } else if (detailsResult.isValid === true) {
    detailsClass = classes["input-valid"];
  } else if (detailsResult.isValid === false) {
    detailsClass = classes["input-invalid"];
  }

  return (
    <section className={classes.form}>
      <header>
        <h1>Create an Event</h1>
      </header>

      <form>
        <div className={classes.input}>
          <label htmlFor="title">Title:</label>
          <p className={classes.caveat}>asda</p>
          <input
            id="title"
            name="title-input"
            placeholder="Title..."
            type="text"
            className={titleClass}
            onChange={titleChangeHandler}
          />
        </div>
        <div className={classes.input}>
          <label htmlFor="image">Image:</label>
          <p className={classes.caveat}>Nice One!</p>
          <input
            id="image"
            type="file"
            onChange={imageChangeHandler}
            className={imageClass}
          />
        </div>
        {/* show-image-preview */}
        <div className={classes["image-preview"]}>
          {!imageResult.fileUrl && <p>{imageResult.previewMessage}</p>}
          {imageResult.fileUrl && (
            <img src={imageResult.fileUrl} alt="Wrong file type!" />
          )}
        </div>
        <div className={classes.input}>
          <label htmlFor="details">Details:</label>
          <p className={classes.caveat}>Nice One!</p>
          <textarea
            id="details"
            name="details-input"
            placeholder="Details..."
            type="text"
            className={detailsClass}
            onChange={detailChangeHandler}
          />
        </div>
      </form>

      <div>
        <button className={classes.button3} onClick={props.cancelFunc}>
          Cancel
        </button>
        <button className={classes.button2} onClick={postEventHandler}>
          Send
        </button>
      </div>
    </section>
  );
};

export default NewPostOverlay;
