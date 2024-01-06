import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postFormValidityActions } from "../../../store/redux/post-form-validity-slice";

import classes from "./PostOverlay.module.scss";

const PostOverlay = (props) => {
  const dispatch = useDispatch();

  const {
    titleCheckResult: titleResult,
    imageCheckResult: imageResult,
    detailsCheckResult: detailsResult,
  } = useSelector((state) => state.postFormValidity);

  const {
    dataEditForm,
    errorEditForm,
    isLoadingEditForm,
  } = useSelector((state) => state.editPost);

  useEffect(() => {
    if (dataEditForm) {
      dispatch(
        postFormValidityActions.checkText({
          enteredInput: dataEditForm.title,
          inputField: "title-input",
        })
      );

      dispatch(
        postFormValidityActions.checkImage({
          fileData: {
            name: "",
            size: "",
            type: "",
          },
          fileUrl: "",
        })
      );

      dispatch(
        postFormValidityActions.checkText({
          enteredInput: dataEditForm.details,
          inputField: "details-input",
        })
      );
    }
  }, [dispatch, dataEditForm]);

  const titleChangeHandler = (e) => {
    const enteredTitle = e.target.value;
    const inputField = e.target.name;

    dispatch(
      postFormValidityActions.checkText({
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
      postFormValidityActions.checkImage({ fileData, fileUrl })
    );
  };

  const detailChangeHandler = (e) => {
    const detailMessage = e.target.value;
    const inputField = e.target.name;

    dispatch(
      postFormValidityActions.checkText({
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

    const enteredTitle = titleResult.enteredTitle;
    const enteredImage = imageResult.fileUrl;
    const enteredDetails = detailsResult.enteredDetails;

    if (dataEditForm) {
      console.log(`Post ${dataEditForm._id} is edited!`);
      console.log("title: ", enteredTitle);
      console.log("image: ", enteredImage);
      console.log("title: ", enteredDetails);

      return;
    }

    console.log("New post created!");
    console.log("title: ", enteredTitle);
    console.log("image: ", enteredImage);
    console.log("title: ", enteredDetails);
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
        <h1>{!dataEditForm ? "Create an Event" : "Edit the Event"}</h1>
      </header>

      <form>
        <div className={classes.input}>
          <label htmlFor="title">Title:</label>
          <p className={classes.caveat}>{titleResult.warningMessage}</p>
          <input
            id="title"
            name="title-input"
            placeholder="Title..."
            type="text"
            className={titleClass}
            onChange={titleChangeHandler}
            defaultValue={dataEditForm ? dataEditForm.title : ""}
          />
        </div>
        <div className={classes.input}>
          <label htmlFor="image">Image:</label>
          <p className={classes.caveat}>{imageResult.warningMessage}</p>
          <input
            id="image"
            type="file"
            onChange={imageChangeHandler}
            className={imageClass}
          />
        </div>
        {/* show-image-preview */}
        <div className={classes["image-preview"]}>
          {!imageResult.fileUrl && <p>Please choose an image!</p>}
          {imageResult.fileUrl && (
            <img src={imageResult.fileUrl} alt="Wrong file type!" />
          )}
        </div>
        <div className={classes.input}>
          <label htmlFor="details">Details:</label>
          <p className={classes.caveat}>{detailsResult.warningMessage}</p>
          <textarea
            id="details"
            name="details-input"
            placeholder="Details..."
            type="text"
            className={detailsClass}
            onChange={detailChangeHandler}
            defaultValue={dataEditForm ? dataEditForm.details : ""}
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

export default PostOverlay;
