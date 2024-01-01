import ReactDOM from "react-dom";

import NewPostBackdrop from "./NewPostBackdrop";
import NewPostOverlay from "./NewPostOverlay";

const NewPostModal = (props) => {

  return (
    <>
      {ReactDOM.createPortal(
        <NewPostBackdrop cancelFunc={props.cancelWindow} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <NewPostOverlay cancelFunc={props.cancelWindow} />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default NewPostModal;
