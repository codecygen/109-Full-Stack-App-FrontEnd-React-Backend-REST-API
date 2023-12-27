import { useState } from "react";

import { Route, Routes } from "react-router-dom";

import { useDispatch } from "react-redux";

import NewPostModal from "./components/NewPostModal";
import NavBar from "./components/NavBar";

import FeedPage from "./pages/root/FeedPage";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";

import { postFormValidityActions } from "./store/redux/post-form-validity-slice";

const App = () => {
  const dispatch = useDispatch();

  const [isPostWindowOpen, setIsPostWindowOpen] = useState(false);

  const quitPostWindow = () => {
    dispatch(postFormValidityActions.resetFormValidity());
    setIsPostWindowOpen(false);
  };

  const openPostWindow = () => {
    setIsPostWindowOpen(true);
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<FeedPage openMessageWindow={openPostWindow} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>

      {/* Message Posting Window */}
      {isPostWindowOpen && <NewPostModal cancelWindow={quitPostWindow} />}
    </>
  );
};

export default App;
