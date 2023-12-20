import ReactDOM from "react-dom";

import NewPostBackdrop from "./NewPostBackdrop";
import NewPostOverlay from "./NewPostOverlay";

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
