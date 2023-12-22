import { useState } from "react";

import { Route, Routes } from "react-router-dom";

import NewPostModal from "./components/NewPostModal";
import NavBar from "./components/NavBar";

import FeedPage from "./pages/root/FeedPage";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";

const App = () => {
  const [isPostWindowOpen, setIsPostWindowOpen] = useState(false);

  const quitPostWindow = () => {
    setIsPostWindowOpen(false);
  };

  const openPostWindow = () => {
    setIsPostWindowOpen(true);
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<FeedPage openMessageWindow={openPostWindow} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>

      {/* Message Posting Window */}
      {isPostWindowOpen && <NewPostModal cancelWindow={quitPostWindow} />}
    </>
  );
};

export default App;
