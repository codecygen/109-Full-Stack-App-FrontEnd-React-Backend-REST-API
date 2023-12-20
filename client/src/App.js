import { Route, Routes } from "react-router-dom";

import NewPostModal from "./components/NewPostModal";
import NavBar from "./components/NavBar";

import FeedPage from "./pages/FeedPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
      <NewPostModal />
    </>
  );
};

export default App;
