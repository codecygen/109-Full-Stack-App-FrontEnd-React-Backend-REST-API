import ReactDOM from "react-dom";

import DeletePostBackdrop from "./DeletePostBackdrop";
import DeletePostOverlay from "./DeletePostOverlay";

const NewPostModal = (props) => {

  return (
    <>
      {ReactDOM.createPortal(
        <DeletePostBackdrop cancelFunc={props.cancelWindow} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <DeletePostOverlay cancelFunc={props.cancelWindow} />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default NewPostModal;
