import ReactDOM from "react-dom";

import NewPostBackdrop from "./NewPostBackdrop";
import NewPostOverlay from "./NewPostOverlay";

const NewPostModal = (props) => {
  const cancelHandler = () => {
    props.cancelWindow();
  };

  return (
    <>
      {ReactDOM.createPortal(
        <NewPostBackdrop cancelFunc={cancelHandler} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <NewPostOverlay cancelFunc={cancelHandler} />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default NewPostModal;
