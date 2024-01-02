import ReactDOM from "react-dom";

import PostBackdrop from "./PostBackdrop";
import PostOverlay from "./PostOverlay";

const NewPostModal = (props) => {

  return (
    <>
      {ReactDOM.createPortal(
        <PostBackdrop cancelFunc={props.cancelWindow} />,
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
