import ReactDOM from "react-dom";

import Backdrop from "../Backdrop";
import DeletePostOverlay from "./DeletePostOverlay";

const NewPostModal = (props) => {

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop cancelFunc={props.cancelWindow} />,
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
