import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { newPostActions } from "../../../store/redux/new-post-slice";
import { editPostActions } from "../../../store/redux/edit-post-slice";

import getAPI from "../../../store/redux/utils/config/getAPI";

import {
  createNewPost,
  updatePost,
} from "../../../store/redux/utils/apiStateManagementsThunk";

import classes from "./PostOverlay.module.scss";

const PostOverlay = (props) => {
  // sending-file-from-reactjs-to-nodejs-for-upload
  const [actualImageObj, setActualImageObj] = useState(null);

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
            name: "current.jpg",
            size: "1000000",
            type: "image/jpeg",
          },
          fileUrl: `${getAPI.link}/${dataEditForm.image}`,
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

  // sending-file-from-reactjs-to-nodejs-for-upload
  const imageChangeHandler = (e) => {
    const actualFileData = e.target.files[0];
    let referenceFileData;
    let fileUrl;

    if (actualFileData) {
      // file varaible is a File object which is nonserializable.
      // We have to make it serializable
      referenceFileData = {
        name: actualFileData.name,
        size: actualFileData.size,
        type: actualFileData.type,
      };

      fileUrl = URL.createObjectURL(actualFileData);
    } else {
      referenceFileData = {
        name: "",
        size: "",
        type: "",
      };

      fileUrl = "";
    }

    // sending-file-from-reactjs-to-nodejs-for-upload
    // Only passing referenceFileData to Redux for image extension assessment
    dispatch(
      newPostActions.checkImage({ fileData: referenceFileData, fileUrl })
    );

    // sending-file-from-reactjs-to-nodejs-for-upload
    // setting actual data in local state because it is a bad practice that
    // storing the entire file object inside the Redux store is generally not
    // recommended because file objects are complex and may contain non-serializable data.
    setActualImageObj(actualFileData);
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

  // sending-file-from-reactjs-to-nodejs-for-upload
  const postEventHandler = () => {
    const isTitleValid = titleResult.isValid;
    const isImageValid = imageResult.isValid;
    const isDetailsValid = detailsResult.isValid;

    // Pre-post input check
    if (!isTitleValid || !isImageValid || !isDetailsValid) {
      console.error("Form is not valid!");

      dispatch(
        newPostActions.checkText({
          enteredInput: titleResult.enteredTitle,
          inputField: "title-input",
        })
      );

      let referenceFileData;
      let fileUrl;

      if (actualImageObj) {
        // file varaible is a File object which is nonserializable.
        // We have to make it serializable
        referenceFileData = {
          name: actualImageObj.name,
          size: actualImageObj.size,
          type: actualImageObj.type,
        };

        fileUrl = URL.createObjectURL(actualImageObj);
      } else {
        referenceFileData = {
          name: "",
          size: "",
          type: "",
        };

        fileUrl = "";
      }

      dispatch(
        newPostActions.checkImage({
          fileData: referenceFileData,
          fileUrl,
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
    const enteredDetails = detailsResult.enteredDetails;

    if (dataEditForm) {
      const updatedPostId = dataEditForm._id;

      // sending-file-from-reactjs-to-nodejs-for-upload
      // which is often used to send data to a server via XMLHttpRequest or the Fetch API,
      // especially when dealing with file uploads.
      const updatedPostData = new FormData();

      // sending-file-from-reactjs-to-nodejs-for-upload
      updatedPostData.append("title", enteredTitle);
      // Keep in mind that actual image object is used here.
      updatedPostData.append("image", actualImageObj);
      updatedPostData.append("details", enteredDetails);

      // sending-file-from-reactjs-to-nodejs-for-upload
      dispatch(updatePost(updatedPostId, updatedPostData));

      return;
    }

    // sending-file-from-reactjs-to-nodejs-for-upload
    // this is a built-in Javascript object
    // which is often used to send data to a server via XMLHttpRequest or the Fetch API,
    // especially when dealing with file uploads.
    const postData = new FormData();

    // sending-file-from-reactjs-to-nodejs-for-upload
    postData.append("title", enteredTitle);
    // Keep in mind that actual image object is used here.
    postData.append("image", actualImageObj);
    postData.append("details", enteredDetails);

    // sending-file-from-reactjs-to-nodejs-for-upload
    dispatch(createNewPost(postData));
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

  if (errorNewPost || errorEditResult) {
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
          {errorEditResult && `Contact Admin: Fetch Error: ${errorEditResult}`}
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
          // sending-file-from-reactjs-to-nodejs-for-upload
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
