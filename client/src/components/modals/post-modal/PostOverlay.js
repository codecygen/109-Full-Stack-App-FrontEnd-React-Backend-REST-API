import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { newPostActions } from "../../../store/redux/new-post-slice";
import { editPostActions } from "../../../store/redux/edit-post-slice";

import classes from "./PostOverlay.module.scss";

const PostOverlay = (props) => {
  const dispatch = useDispatch();

  const {
    titleCheckResult: titleResult,
    imageCheckResult: imageResult,
    detailsCheckResult: detailsResult,
  } = useSelector((state) => state.newPost);

  const { dataEditForm, errorEditForm, isLoadingEditForm } = useSelector(
    (state) => state.editPost
  );

  useEffect(() => {
    if (dataEditForm) {
      dispatch(
        newPostActions.checkText({
          enteredInput: dataEditForm.title,
          inputField: "title-input",
        })
      );

      dispatch(
        newPostActions.checkImage({
          fileData: {
            name: "",
            size: "",
            type: "",
          },
          fileUrl: "",
        })
      );

      dispatch(
        newPostActions.checkText({
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
      newPostActions.checkText({
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

    dispatch(newPostActions.checkImage({ fileData, fileUrl }));
  };

  const detailChangeHandler = (e) => {
    const detailMessage = e.target.value;
    const inputField = e.target.name;

    dispatch(
      newPostActions.checkText({
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

      dispatch(
        newPostActions.checkText({
          enteredInput: titleResult.enteredTitle,
          inputField: "title-input",
        })
      );

      dispatch(
        newPostActions.checkImage({
          fileData: {
            name: "",
            size: "",
            type: "",
          },
          fileUrl: "",
        })
      );

      dispatch(
        newPostActions.checkText({
          enteredInput: detailsResult.enteredDetails,
          inputField: "details-input",
        })
      );

      return;
    }

    const enteredTitle = titleResult.enteredTitle;
    const enteredImage = imageResult.fileUrl;
    const enteredDetails = detailsResult.enteredDetails;

    if (dataEditForm) {
      console.log(`Post ${dataEditForm._id} is edited!`);
      console.log("title: ", enteredTitle);
      console.log("image: ", enteredImage);
      console.log("details: ", enteredDetails);

      dispatch(editPostActions.toggleWindow());
      dispatch(editPostActions.reset());

      dispatch(newPostActions.toggleWindow());
      dispatch(newPostActions.reset());

      return;
    }

    console.log("New post created!");
    console.log("title: ", enteredTitle);
    console.log("image: ", enteredImage);
    console.log("details: ", enteredDetails);

    dispatch(editPostActions.toggleWindow());
    dispatch(editPostActions.reset());

    dispatch(newPostActions.toggleWindow());
    dispatch(newPostActions.reset());
  };

  let titleClass;

  if (titleResult.isValid === null && !errorEditForm) {
    titleClass = "";
  } else if (titleResult.isValid === true) {
    titleClass = classes["input-valid"];
  } else if (titleResult.isValid === false) {
    titleClass = classes["input-invalid"];
  } else if (errorEditForm) {
    titleClass = classes["input-disabled"];
  }

  let imageClass;

  if (imageResult.isValid === null && !errorEditForm) {
    imageClass = "";
  } else if (imageResult.isValid === true) {
    imageClass = classes["img-valid"];
  } else if (imageResult.isValid === false) {
    imageClass = classes["img-invalid"];
  } else if (errorEditForm) {
    imageClass = classes["img-disabled"];
  }

  let detailsClass;

  if (detailsResult.isValid === null && !errorEditForm) {
    detailsClass = "";
  } else if (detailsResult.isValid === true) {
    detailsClass = classes["input-valid"];
  } else if (detailsResult.isValid === false) {
    detailsClass = classes["input-invalid"];
  } else if (errorEditForm) {
    detailsClass = classes["input-disabled"];
  }

  return (
    <section className={classes.form}>
      <header>
        <h1>{!dataEditForm ? "Create an Event" : "Edit the Event"}</h1>
        <p>Contact Admin: Fetch Error: {errorEditForm}</p>
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
            onInput={titleChangeHandler}
            defaultValue={dataEditForm ? dataEditForm.title : ""}
            disabled={errorEditForm}
            readOnly={errorEditForm}
          />
        </div>
        <div className={classes.input}>
          <label htmlFor="image">Image:</label>
          <p className={classes.caveat}>{imageResult.warningMessage}</p>
          <input
            id="image"
            type="file"
            onChange={imageChangeHandler}
            onInput={imageChangeHandler}
            className={imageClass}
            disabled={errorEditForm}
            readOnly={errorEditForm}
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
            onInput={detailChangeHandler}
            defaultValue={dataEditForm ? dataEditForm.details : ""}
            disabled={errorEditForm}
            readOnly={errorEditForm}
          />
        </div>
      </form>

      <div>
        <button className={classes.button3} onClick={props.cancelFunc}>
          Cancel
        </button>
        <button
          className={errorEditForm ? classes.button6 : classes.button2}
          onClick={postEventHandler}
          disabled={errorEditForm}
        >
          Send
        </button>
      </div>
    </section>
  );
};

export default PostOverlay;
