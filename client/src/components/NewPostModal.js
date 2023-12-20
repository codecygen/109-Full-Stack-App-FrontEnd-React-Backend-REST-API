import ReactDOM from "react-dom";

const NewPostOverlay = () => {
  return <p>This is the NewPost overlay!</p>;
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
