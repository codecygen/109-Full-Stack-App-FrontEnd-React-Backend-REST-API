import ReactDOM from "react-dom";

import Backdrop from "../Backdrop";
import DeleteCommentOverlay from "./DeleteCommentOverlay";

const DeletePostModal = (props) => {

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop cancelFunc={props.cancelWindow} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <DeleteCommentOverlay cancelFunc={props.cancelWindow} />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default DeletePostModal;
