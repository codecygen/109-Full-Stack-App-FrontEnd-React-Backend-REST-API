import { useState } from "react";

import { Route, Routes } from "react-router-dom";

import NewPostModal from "./components/NewPostModal";
import NavBar from "./components/NavBar";

import FeedPage from "./pages/FeedPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const App = () => {
  const [isPostWindowOpen, setIsPostWindowOpen] = useState(true);

  const quitPostWindow = () => {
    setIsPostWindowOpen(false);
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>

      {/* Message Posting Window */}
      {isPostWindowOpen && <NewPostModal cancelWindow={quitPostWindow} />}
    </>
  );
};

export default App;
