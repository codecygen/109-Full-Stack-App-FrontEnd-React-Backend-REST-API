import ReactDOM from "react-dom";

import classes from "./NewPostModal.module.scss";

const NewPostBackdrop = () => {
  return <section className={classes.backdrop}></section>;
};

const NewPostOverlay = () => {
  return (
    <section className={classes.form}>
      <div>Some Text</div>
      <div>Some Text</div>
    </section>
  );
};

const NewPostModal = () => {
  return (
    <>
      {ReactDOM.createPortal(
        <NewPostBackdrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <NewPostOverlay />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default NewPostModal;
