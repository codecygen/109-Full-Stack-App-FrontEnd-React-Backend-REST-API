import ReactDOM from "react-dom";

import Backdrop from "../Backdrop";
import PostOverlay from "./PostOverlay";

const NewPostModal = (props) => {

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop cancelFunc={props.cancelWindow} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <PostOverlay cancelFunc={props.cancelWindow} />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default NewPostModal;
