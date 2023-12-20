import ReactDOM from "react-dom";

import classes from "./NewPostModal.module.scss";

const NewPostOverlay = () => {
  return <p className={classes["form-box"]}>This is the NewPost overlay!</p>;
};

const NewPostModal = () => {
  return (
    <>
      {ReactDOM.createPortal(
        <NewPostOverlay />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default NewPostModal;
