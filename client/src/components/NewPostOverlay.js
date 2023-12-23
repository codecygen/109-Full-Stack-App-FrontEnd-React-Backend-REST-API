import { useState } from "react";

import classes from "./NewPostOverlay.module.scss";

const NewPostOverlay = (props) => {
  // show-image-preview
  const [imageSrc, setImgSrc] = useState("");

  const [imagePreviewMessage, setImagePreviewMessage] = useState(
    "Please choose an image!"
  );

  // show-image-preview
  const imageChangeHandler = (e) => {
    const file = e.target.files[0];

    const fileExtension = file.name.split(".").pop();
    const validFileExtensions = ["jpg", "jpeg", "png", "gif"];
    const isImageFile = validFileExtensions.includes(fileExtension);

    if (isImageFile) {
      const fileUrl = URL.createObjectURL(file);
      return setImgSrc(fileUrl);
    }

    setImgSrc("");
    setImagePreviewMessage("Not an image file!");
  };

  return (
    <section className={classes.form}>
      <header>
        <h1>Create a Post</h1>
      </header>

      <form>
        <div className={classes.input}>
          <label htmlFor="title">Title</label>
          <input id="title" placeholder="Title..." type="text" />
        </div>
        <div className={classes.input}>
          <label htmlFor="image">Image</label>
          <input id="image" type="file" onChange={imageChangeHandler} />
        </div>
        {/* show-image-preview */}
        <div className={classes["image-preview"]}>
          {!imageSrc && <p>{imagePreviewMessage}</p>}
          {imageSrc && <img src={imageSrc} alt="Wrong file type!" />}
        </div>
        <div className={classes.input}>
          <label htmlFor="message">Message</label>
          <textarea id="message" placeholder="Message..." type="text" />
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
