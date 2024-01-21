import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { newPostActions } from "../../../store/redux/new-post-slice";
import { editPostActions } from "../../../store/redux/edit-post-slice";

import {
  createNewPost,
  updatePost,
} from "../../../store/redux/utils/apiStateManagementsThunk";

import classes from "./PostOverlay.module.scss";

const PostOverlay = (props) => {
  const imageInputRef = useRef(null);

  const dispatch = useDispatch();

  const {
    titleCheckResult: titleResult,
    imageCheckResult: imageResult,
    detailsCheckResult: detailsResult,
    dataNewPost,
    errorNewPost,
    isLoadingNewPost,
  } = useSelector((state) => state.newPost);

  const {
    dataEditForm,
    errorEditForm,
    isLoadingEditForm,
    errorEditResult,
    isLoadingEditResult,
  } = useSelector((state) => state.editPost);

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

  useEffect(() => {
    // Only close newpost window if the data is successfully sent to backend
    // for creating a new post
    if (errorNewPost === false && isLoadingNewPost === false) {
      dispatch(newPostActions.toggleWindow());
      dispatch(editPostActions.toggleWindow());

      dispatch(newPostActions.reset());
      dispatch(editPostActions.reset());
    }
  }, [dispatch, errorNewPost, isLoadingNewPost]);

  useEffect(() => {
    // Only close edit post window if the data is successfully sent to backend
    // for editing a post
    if (errorEditResult === false && isLoadingEditResult === false) {
      dispatch(newPostActions.toggleWindow());
      dispatch(editPostActions.toggleWindow());

      dispatch(newPostActions.reset());
      dispatch(editPostActions.reset());
    }
  }, [dispatch, errorEditResult, isLoadingEditResult]);

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
    let fileData;
    let fileUrl;

    if (file) {
      // file varaible is a File object which is nonserializable.
      // We have to make it serializable
      fileData = {
        name: file.name,
        size: file.size,
        type: file.type,
      };

      fileUrl = URL.createObjectURL(file);
    } else {
      fileData = {
        name: "",
        size: "",
        type: "",
      };

      fileUrl = "";
    }

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

      const fileData = imageInputRef.current.files[0];

      if (fileData) {
        dispatch(
          newPostActions.checkImage({
            fileData,
            fileUrl: imageResult.fileUrl,
          })
        );
      }

      dispatch(
        newPostActions.checkText({
          enteredInput: detailsResult.enteredDetails,
          inputField: "details-input",
        })
      );

      return;
    }

    const enteredTitle = titleResult.enteredTitle;
    const enteredImage = imageResult.fileObject;
    const enteredDetails = detailsResult.enteredDetails;

    if (dataEditForm) {
      const updatedPostId = dataEditForm._id;

      const updatedPostData = new FormData();

      updatedPostData.append("title", enteredTitle);
      updatedPostData.append("image", enteredImage);
      updatedPostData.append("details", enteredDetails);

      console.log(updatedPostId, updatedPostData);
      console.log(enteredImage);

      // dispatch(updatePost(updatedPostId, updatedPostData));

      return;
    }

    const postData = new FormData();

    postData.append("title", enteredTitle);
    postData.append("image", enteredImage);
    postData.append("details", enteredDetails);

    console.log(postData);
    console.log(enteredImage);

    // dispatch(createNewPost(postData));
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

  let warningClasses;

  if (errorNewPost) {
    warningClasses = classes.error;
  } else {
    warningClasses = classes.loading;
  }

  return (
    <section className={classes.form}>
      <header>
        <h1 className={dataNewPost && classes["delete-result"]}>
          {!dataEditForm ? "Create an Event" : "Edit the Event"}
        </h1>
        <p className={warningClasses}>
          {errorEditForm && `Contact Admin: Fetch Error: ${errorEditForm}`}
          {isLoadingEditForm && "Waiting to Get Post Info!"}
          {errorNewPost && `Contact Admin: Posting Error: ${errorNewPost}`}
          {isLoadingNewPost && "Waiting to Send Post!"}
        </p>
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
            ref={imageInputRef}
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
