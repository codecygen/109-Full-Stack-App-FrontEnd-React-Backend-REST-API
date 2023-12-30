import { useState } from "react";

import { Route, Routes } from "react-router-dom";

import { useDispatch } from "react-redux";

import NewPostModal from "./components/NewPostModal";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import EventsPage from "./pages/root/EventsPage";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";

import { postFormValidityActions } from "./store/redux/post-form-validity-slice";

const App = () => {
  const dispatch = useDispatch();

  const [isPostWindowOpen, setIsPostWindowOpen] = useState(false);

  const quitPostWindow = () => {
    dispatch(postFormValidityActions.resetFormValidity());
    setIsPostWindowOpen(false);

    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
  };

  const openPostWindow = () => {
    setIsPostWindowOpen(true);

    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<EventsPage openMessageWindow={openPostWindow} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>

      {/* Message Posting Window */}
      {isPostWindowOpen && <NewPostModal cancelWindow={quitPostWindow} />}

      <Footer />
    </>
  );
};

export default App;
